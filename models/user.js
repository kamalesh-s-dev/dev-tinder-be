const mongoose = require('mongoose');
const { type } = require('os');

const userSchema = new mongoose.Schema({
    firstName: { type: String},
    lastName: { type: String},
    emailId: { type: String , required:true},
    password: { type: String , required:true},
    age: { type: Number},
    gender: { type: String}
})

const User = mongoose.model('user',userSchema)

module.exports = User;