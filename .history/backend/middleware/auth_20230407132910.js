const catchAsyncErrors = require('catchAsyncErrors');

const isAuthenticateUser = catchAsyncErrors(async(req, res, next) => {
    const token = req.cookie;

    console.log(token);
});