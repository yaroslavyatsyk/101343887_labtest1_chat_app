const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Can not be empty"],
        lowercase: true,
    },
    firstname: {
        type: String,
        required: [true, "Can not be empty"],
        lowercase: true,
    },
    lastname: {
        type: String,
        required: [true, "Can not be empty"],
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Can not be empty"],
        minlength: 8
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})

const userModel = mongoose.model("userModel",userSchema)
module.exports = userModel