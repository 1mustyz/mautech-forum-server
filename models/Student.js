const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

//Schema design
const StudentSchema = new Schema({
    username: { type: String, unique: true},
    department: { type: String},
    level: { type: String},
    email: { type: String},

    // if user is admin, he can accept and delete post and comment
    isAdmin: { type: Boolean},

    // if user is acredited which means he can make post and comment
    isAcredited: { type: Boolean},
}, { timestamps: true });

//plugin passport-local-mongoose to enable password hashing and salting and simpligy other things
StudentSchema.plugin(passportLocalMongoose);

//connect the schema with user table
const Student = mongoose.model('student', StudentSchema);

//export the model 
module.exports = Student;