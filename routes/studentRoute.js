const router = require('express').Router();
const studentController = require('../controller/studentController')
const logoutController = require('../controller/logoutController')

 router.post('/login', studentController.loginStudent)
 router.post('/change-password/:id', studentController.resetPassword)
 router.post('/logout', logoutController.logout)

 router.put('/set-profile-pic', studentController.setProfilePic);
 
module.exports = router