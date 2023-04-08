const ErrorHandler = require('../utils/errorhander');
const catchAsyncErrors = require('./catchAsyncErrors');
const jwt = require("jsonwebtoken")

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("Please Login to access this resouece", 401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
});