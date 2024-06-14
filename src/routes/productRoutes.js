const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const productSchema = require('../models/product');

router.post('/', auth, validate(productSchema), productController.createProduct);
router.get('/:id', productController.getProduct);
router.put('/:id', auth, validate(productSchema), productController.updateProduct);
router.delete('/:id', auth, productController.deleteProduct);
router.get('/', productController.getAllProducts);

module.exports = router;
