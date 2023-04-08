const Product = require("../models/productModel");


//Create product
exports.createProduct = async (req, res, next) => {
    const product = await Product.create(req.body);
}






exports.getAllProducts = (req, res) => {
    res.status(200).json({massage:"Route is woking fine"});
}