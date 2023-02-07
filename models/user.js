const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
    room: [
        {
            type: String,
            required: false,
        }
    ]
}, {
    timestamps: true
},
);

const userModel = mongoose.model('userModel', userSchema);

module.exports = userModel;