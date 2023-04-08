const ErrorHander = require('../utils/errorhander');

module.exports = (err,req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    //Wrong Mongodb Id error
    if (err.name === "CastError") {
        const message =  `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHander(message, 400);
    }

    //Mongose dulicate ky error
    if (err.code === 11000) {
        const message = `Dulicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHander(message, 400);
    }

    //JWT EXPIRE error
    if (err.name === "TokenExpiredError") {
        const message =  `Json Web Token is Expired, Try again `;
        err = new ErrorHander(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        error: err.message,
    });
};
