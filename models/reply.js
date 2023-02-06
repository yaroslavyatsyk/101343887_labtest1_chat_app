const mongoose = require('mongoose')

const replySchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true,
        lowercase: true,
    },
    receiver: {
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

const replyModel = mongoose.model("replyModel",replySchema)
module.exports = replyModel