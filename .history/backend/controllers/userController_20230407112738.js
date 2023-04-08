const ErrorHandler = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");


//Register a User 
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const {name, email, password} = req.body;

    const user =  await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "this is a sample id",
            url: "profilepicUrl"
        },
    });
    
    const token = user.getJWTToken();


    res.status(201).json({
        success: true,
        token,
    });
});


//Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const {email, password} = req.body;

    //check if the user has given password and email both

    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password", 400));
    }

    const user = User.findOne({email}).select("+password");

    if(!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

})
