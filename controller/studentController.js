const passport = require('passport');
const Student = require('../models/Student')
const multer = require('multer');
const {singleUpload} = require('../middlewares/filesMiddleware');

// student registration controller
exports.registerStudent = async function (req, res, next) {
  try {
    
    user = new Student(req.body)
    const password = req.body.password ? req.body.password : 'password';
    //save the user to the DB
    Student.register(user, password, async (error, user) => {
      if (error) return res.json({ success: false, error }) 
      // add subjects to the student
      
      res.json({ success: true, user })
    })
  } catch (error) {
    res.json({ success: false, error })
  }
}


// student login controller
exports.loginStudent = (req, res, next) => {

  // perform authentication
  passport.authenticate('student', (error, user, info) => {
    if (error) return res.json({ success: false, error })
    if (!user)
      return res.json({
        success: false,
        message: 'username or password is incorrect'
      })
    //login the user  
    req.login(user, (error) => {
      if (error)
        res.json({ success: false, message: 'something went wrong pls try again' })
      req.session.user = user
      res.json({ success: true, message: 'student login success', user })
    })
  })(req, res, next)
}

exports.setProfilePic = async (req,res, next) => {

  singleUpload(req, res, async function(err) {
    if (err instanceof multer.MulterError) {
    return res.json(err.message);
    }
    else if (err) {
      return res.json(err);
    }
    else if (!req.file) {
      return res.json({"image": req.file, "msg":'Please select an image to upload'});
    }
    if(req.file){
        console.log(req.query.id)
        await Student.findOneAndUpdate({_id: req.query.id},{$set: {image: req.file.path}})
        return  res.json({success: true,
        message: req.file.path,
                   },
        
    );
    }
    });          
  
}
// reset password by parent / student
exports.resetPassword = async (req, res, next) => {
  try {
    const user = await Student.findById(req.params.id)
    await user.changePassword(req.body.oldPassword, req.body.newPassword)
    await user.save()
    res.json({user})
  } catch (error) {
      res.json({ message: 'something went wrong', error })
  }
}
// reset password for student by admin
exports.adminResetStudentPassword = async (req, res, next) => {
  try {
    const user = await Student.findById(req.params.id)
    await user.setPassword('password')
    await user.save()
    res.json({user})
  } catch (error) {
      res.json({ message: 'something went wrong', error })
  }
}

exports.findAllStudent = async (req,res,next) => {
  const students = await Student.find()

  students
   ? res.json({ success: true, students:students })
   : res.json({ success: true, message:students })
}





exports.findOneStudent = async (req,res,next) => {
  const {id} = req.query;

  const student = await Student.findById(id)

  student
   ? res.json({success: true, student: student})
   : res.json({success: true, student: student})
  
}

exports.removeStudent = async (req,res,next) => {
  const {id,username} = req.query;
  
  res.json({success: true, message: `student with the id ${id} has been removed`})
}





