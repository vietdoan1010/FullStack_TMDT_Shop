const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifestures");


//Create product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {

    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(200).json({
        success: true,
        product,
    })
})


//Get all product
exports.getAllProducts = catchAsyncErrors( async (req, res) => {

    const resultPerPage =   5;
    const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
    const products = await apiFeature.query;

    res.status(200).json({
        success: true,
         products,
         productCount,
    })
})

//Get Product Detail
exports.getProductDetails = catchAsyncErrors (async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        product,
    })
})


//Update product -- Admin
exports.updateProduct  = catchAsyncErrors( async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if(!product) {
        return res.status(500).json({
            success: false,
            message: "Product not found"
        })
    }
    product =  await Product.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators:true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        product
    })
})


//Delete Product -- Admin
exports.deleteProduct  = catchAsyncErrors ( async (req, res, next) => {
    const product = await Product.findByIdAndDelete(req.params.id);

    if(!product) {
        return res.status(500).json({
            success: false,
            message: "Product not found"
        })
    }
    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: "Product Delete Successfully"
    })
})

