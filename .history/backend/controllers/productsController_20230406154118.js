const Product = require("../models/productModel");


//Create product






exports.getAllProducts = (req, res) => {
    res.status(200).json({massage:"Route is woking fine"});
}