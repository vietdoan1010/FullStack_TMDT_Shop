const Product = require("../models/productModel")






exports.getAllProducts = (req, res) => {
    res.status(200).json({massage:"Route is woking fine"});
}