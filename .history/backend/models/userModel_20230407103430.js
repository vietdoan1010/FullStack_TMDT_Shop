const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({

    name: {
        type: 'String',
        required: [true, "Please Enter Your Name"], 
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more then 4 characters"]
    },
    email: {
        type: 'String',
        required: [true, "Please Enter Your Email"], 
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid email"]
    },
    password: {
        type: 'String',
        required: [true, "Please Enter Your Password"],
        maxLength: [8, "Password must be at least 8 characters"],
        select: false,
    },
    avatar: { 
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
    },
    role: {
        type: 'String',
        default: 'user'
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
})

module.exports = mongoose.model("User", userSchema);