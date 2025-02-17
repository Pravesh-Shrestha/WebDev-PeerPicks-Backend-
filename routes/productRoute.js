const express = require('express');
const productController = require('../controllers/productController');
const upload = require('../middleware/imageUpload');

const router = express.Router();

// Routes
router.post('/', upload.single('productImage'), productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', upload.single('productImage'), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
