const Product = require("../models/productModel");


//Create product -- Admin
exports.createProduct = async (req, res, next) => {
    const product = await Product.create(req.body);

    res.status(200).json({
        success: true,
         product
    })
}


//Get all product
exports.getAllProducts = async (req, res) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
         products
    })
}


