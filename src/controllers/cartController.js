const db = require('../db');

const addToCart = async (req, res) => {
    console.log('req.user:', req.user);
    console.log('req.body:', req.body);

    try {
        // Ensure req.user is available after authentication middleware
        if (!req.user || !req.user.id) {
            return res.status(401).json({ success: false, message: 'User not authenticated.' });
        }

        const { productId, quantity } = req.body;

        // Fetch product details from the database based on the productId
        const product = await db.fetchProductById(productId);
        console.log('Product details:', product);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found.' });
        }

        // Check if the product is already in the user's cart
        const existingCartItem = req.user.cart.find(item => item.productId === productId);

        if (existingCartItem) {
            // If the product is already in the cart, update the quantity
            existingCartItem.quantity += quantity;
        } else {
            // If the product is not in the cart, add it
            req.user.cart.push({ productId, quantity });
        }

        // Save the updated cart to the database
        console.log('userId:', req.user.id);
        await db.updateUserCart(req.user.id, req.user.cart);

        res.json({ success: true, message: 'Product added to the cart successfully.' });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};



const updateCartItemQuantity = async (req, res) => {
    try {
        // Ensure req.user is available after authentication middleware
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'User not authenticated.' });
        }

        const { productId, quantity } = req.body;

        // Find the item in the user's cart
        const cartItem = req.user.cart.find(item => item.productId === productId);

        if (!cartItem) {
            return res.status(404).json({ success: false, message: 'Item not found in the cart.' });
        }

        // Update the quantity and save to the database
        cartItem.quantity = quantity;
        await db.updateUserCart(req.user.id, req.user.cart);

        res.json({ success: true, message: 'Cart item quantity updated successfully.' });
    } catch (error) {
        console.error('Error updating cart item quantity:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

const removeFromCart = async (req, res) => {
    try {
        // Ensure req.user is available after authentication middleware
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'User not authenticated.' });
        }

        const { productId } = req.params;

        // Remove the item from the user's cart
        req.user.cart = req.user.cart.filter(item => item.productId !== productId);

        // Save the updated cart to the database
        await db.updateUserCart(req.user.id, req.user.cart);

        res.json({ success: true, message: 'Product removed from the cart successfully.' });
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

const checkout = async (req, res) => {
    try {
        // Implement the checkout logic here
        // You may want to create an order, update product quantities, etc.

        // Ensure req.user is available after authentication middleware
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'User not authenticated.' });
        }

        // Clear the user's cart after successful checkout
        req.user.cart = [];
        await db.updateUserCart(req.user.id, req.user.cart);

        res.json({ success: true, message: 'Checkout successful.' });
    } catch (error) {
        console.error('Error during checkout:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

module.exports = { addToCart, updateCartItemQuantity, removeFromCart, checkout };


