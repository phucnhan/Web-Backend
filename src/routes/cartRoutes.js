// cartRoutes.js

const express = require('express');
const router = express.Router();
const { addToCart, updateCartItemQuantity, removeFromCart, checkout } = require('../controllers/cartController');
const authenticateUser = require('../middleware/authMiddleware');

// Apply authentication middleware to all cart routes
router.use(authenticateUser);

router.post('/add-to-cart', addToCart);
router.put('/update-cart-item-quantity', updateCartItemQuantity);
router.delete('/remove-from-cart/:productId', removeFromCart);
router.post('/checkout', checkout);

module.exports = router;

