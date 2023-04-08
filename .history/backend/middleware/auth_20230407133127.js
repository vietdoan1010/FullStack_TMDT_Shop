const catchAsyncErrors = require('catchAsyncErrors');

exports.isAuthenticateUser = catchAsyncErrors(async(req, res, next) => {
    const token = req.cookie;

    console.log(token);
});