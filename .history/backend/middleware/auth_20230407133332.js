const catchAsyncErrors = require('catchAsyncErrors');

exports.isAuthenticatedUser = catchAsyncErrors(async(req, res, next) => {
    const token = req.cookie;

    console.log(token);
});