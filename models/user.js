const mongoose = require('mongoose');
const { type } = require('os');

const userSchema = mongoose.SchemaTypes({
    firstName: { type: String},
    lastName: { type: String},
    emailId: { type: String},
    password: { type: String},
    age: { type: Number},
    gender: { type: String}
})

