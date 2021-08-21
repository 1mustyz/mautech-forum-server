const Post = require('../models/Post')


exports.createPost = async (req,res,next) => {

    await Post.collection.insertOne(req.body)
    res.json({success: true, message: 'Your post is created sucessfully'})
}

exports.adminGetAllPost = async (req,res,next) => {

    const result = await Post.find()
    result.length > 0
     ? res.json({success: true, result})
     : res.json({success: false, result})

}

exports.getAllPublicPost = async (req,res,next) => {

    const result = await Post.find({isPostApprove: true})
    result.length > 0
     ? res.json({success: true, result})
     : res.json({success: false, result})

}

exports.getAllRestrictedPost = async (req,res,next) => {

    const result = await Post.find({isPostApprove: false})
    result.length > 0
     ? res.json({success: true, result})
     : res.json({success: false, result})

}

exports.getAllPublicFeaturedPost = async (req,res,next) => {

    const result = await Post.find({isPostApprove: true, isFeatured: true})
    result.length > 0
     ? res.json({success: true, result})
     : res.json({success: false, result})

}

exports.approveOrFeaturedAPost = async (req,res,next) => {

    const field = req.body.key
    const value = req.body.value

    const result = await Post.findByIdAndUpdate(req.body.id, {
        [field]: value
    }, {new: true, useFindAndModify: false})

    field == "isPostApprove"
    ? res.json({success: true, message:'The post has been aproved'})
    : res.json({success: true, message:'The post has been featured'})

}

exports.updateAPost = async (req,res,next) => {
    const field = req.body.key
    const value = req.body.value

    const result = await Post.findByIdAndUpdate(req.body.id, {
        [field]: value
    }, {new: true, useFindAndModify: false})
}