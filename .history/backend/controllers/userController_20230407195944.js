const ErrorHandler = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require('crypto');


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
    
    sendToken(user, 201, res);
});


//Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const {email, password} = req.body;

    //check if the user has given password and email both

    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password", 400));
    }

    const user = await User.findOne({email}).select("+password");

    if(!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401))
    }

    sendToken(user, 200, res);

});


//Logout User
exports.logout = catchAsyncErrors(async (req, res, next) =>{
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged out"
    })
})

//Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req,res,next)=>{
    const user = await User.findOne({email: req.body.email});

    if(!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    //Get reset password token
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave: false});

    const resetPasswordUrl = `${req.protocol}://${req.get (
        "host"
    )}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is : - \n\n ${resetPasswordUrl} \n\nIf you have node requested this email then, please 
    ignore it `;

    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message,
        })

        res.status(200).json({
            success: true,
            message: `Email sent ${user.email} to successfully`
        })
        
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false});

        return next(new ErrorHandler(error.message, 500));
    }
});

//Reset Password 
exports.resetPassword = catchAsyncErrors(async (req, res, next) =>{
    //create token hash 
    const resetPasswordToken = crypto 
        .createHash('sha256')
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()},
    });


    if(!user) {
        return next(
            new ErrorHandler(
                "Reset Password Token is invalid or has been expried",
                400
            )
        );
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler ("Password does not password", 400))
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
});

//Get User Detail
exports.getUserDetails = catchAsyncErrors(async(req, res, next) =>{
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});

//Uppdate User Password
exports.updatePassword = catchAsyncErrors(async (req, res, next) =>{
    const user = await User.findById(req.user.id).select("+ password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old Password is incorrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400));
    }
    
    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
    
});


//Uppdate User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) =>{
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };

    //We will and Cloundinary later
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        user
    })
});


//Get all user admin
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
    const  users = await User.find();

    res.status(200).json({
        status: true,
        users,
    })
})


//Get single user admin
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const  user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler (`User does not exist with Id: ${req.params.id}`));
    }

    res.status(200).json({
        status: true,
        user,
    })
})


//Uppdate User Role Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) =>{
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        user
    })
});


//Delete User Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) =>{
    const user = await User.findById(req.params.id);
    //We will and Cloundinary later

    if (!user) {
        return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`))
    }

    await user.remove(req.params.id);
    

    res.status(200).json({
        success: true,
        user
    })
});