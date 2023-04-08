const express = require('express');
const {getAllProducts} = require('../controllers/productsController');


const router = express.Router();

router.route('/products').get(getAllProducts);


