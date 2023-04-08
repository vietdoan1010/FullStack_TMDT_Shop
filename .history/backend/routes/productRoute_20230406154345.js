const express = require('express');
const {getAllProducts, createProduct } = require('../controllers/productsController');


const router = express.Router();

router.route('/products').get(getAllProducts);
router.route('/product/new').get(createProduct);


module.exports = router;