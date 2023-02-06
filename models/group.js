const mongoose = require('mongoose')

const groupSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true,
        lowercase: true,
    },
    room: {
        type: String,
        required: true,
        lowercase: true,
    },
    message: {
        type: String,
        required: true,
    },
   
    date_sent: {
        type: Date,
        default: Date.now()
    }
})

const groupModel = mongoose.model("groupModel",groupSchema)
module.exports = groupModel