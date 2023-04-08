const express = require('express');
const {getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controllers/productsController');
const { isAuthenticatedUser } = require('../middleware/auth');



const router = express.Router();

router.route('/products').get( isAuthenticatedUser, getAllProducts);
router.route('/product/new').post(isAuthenticatedUser, createProduct);
router
.route('/product/:id')
.put(isAuthenticatedUser, updateProduct)
.delete(isAuthenticatedUser, deleteProduct)
.get(getProductDetails);



module.exports = router;