const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema design
const PostSchema = new Schema({
    username: { type: String, unique: true},
    post: {type: String},
    comment: {type: Array},
    isPostApprove: {type: Boolean, default: false},
    isFeatured: {type: Boolean, default: false}

}, { timestamps: true });


//connect the schema with user table
const Post = mongoose.model('post', PostSchema);

//export the model 
module.exports = Post;