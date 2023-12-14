// controllers/productController.js

const db = require('../db');

const fetchProducts = async (req, res) => {
    try {
        const products = await db.fetchProducts();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

const addProduct = async (req, res) => {
    const { name, price, description, image_path } = req.body;
    try {
        await db.createProduct(name, price, description, image_path);
        res.json({ success: true, message: 'Product created successfully' });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;

    // Validate if ID is provided
    if (!id) {
        return res.status(400).json({ success: false, message: 'Product ID is required for update.' });
    }

    // Check if the product with the provided ID exists
    const existingProduct = await db.findProductById(id);
    if (!existingProduct) {
        return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    try {
        // Update the product
        await db.updateProduct(id, updatedFields);
        res.json({ success: true, message: 'Product updated successfully' });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await db.deleteProduct(id);
        res.json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

const viewProducts = async (req, res) => {
    try {
        const products = await db.fetchProducts();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

module.exports = { fetchProducts, addProduct, updateProduct, deleteProduct, viewProducts };
