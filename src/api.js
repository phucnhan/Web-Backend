require('dotenv').config();

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const viewRoutes = require('./routes/viewRoutes');
const { swaggerUi, specs } = require('./swagger');
const api = express();
const PORT = process.env.PORT || 3001;
const path = require('path');

// Middleware
api.use(cors());
api.use(express.json());

// Serve static files (images) from multiple folders
api.use('/images', express.static(path.join(__dirname, 'images')));

//Swagger
api.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
// Routes
api.use('/api/auth', authRoutes); // Assuming auth routes are mounted at /api/auth
api.use('/api/products', productRoutes); // Mount product routes at /api/products
api.use('/api/view', viewRoutes);

// Error handling middleware
api.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal server error.' });
});

// Start the server
api.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
