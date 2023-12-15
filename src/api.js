require('dotenv').config();

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const viewRoutes = require('./routes/viewRoutes');
const cartRoutes = require('./routes/cartRoutes');
const api = express();
const PORT = process.env.PORT || 3001;
const path = require('path');

// Middleware
api.use(cors());
api.use(express.json());

// Serve static files (images) from multiple folders
api.use('/images', express.static(path.join(__dirname, 'images')));


// Routes
api.use('/api/auth', authRoutes); // Assuming auth routes are mounted at /api/auth
api.use('/api/products', productRoutes); // Mount product routes at /api/products
api.use('/api/view', viewRoutes);
api.use('/api/cart', cartRoutes);

// Error handling middleware
api.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal server error.' });
});

// Start the server
api.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
