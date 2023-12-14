// routes/viewRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Define routes for viewing products
router.get('/view-products', productController.viewProducts);
router.get('/view-products/:id', productController.viewProductById);

module.exports = router;