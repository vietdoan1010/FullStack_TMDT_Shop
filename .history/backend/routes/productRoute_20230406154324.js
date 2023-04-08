const express = require('express');
const {getAllProducts, createProduct } = require('../controllers/productsController');


const router = express.Router();

router.route('/products').get(getAllProducts);


module.exports = router;