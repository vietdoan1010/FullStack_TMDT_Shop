const ErrorHandler = require('../utils/errorhander');

module.exports = (err,req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    //Wrong Mongodb Id error
    if (err.name === "CastError") {
        const message =  `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    //Mongose dulicate ky error
    if (err.code === 11000) {
        const message = `Dulicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400)
    }

    res.status(err.statusCode).json({
        success: false,
        error: err.message,
    });
};
