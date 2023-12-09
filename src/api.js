require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const api = express();
const PORT = process.env.PORT || 3001;

// Middleware
api.use(cors());
api.use(bodyParser.json());

// Routes
api.use('/api', authRoutes);

// Error handling middleware
api.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal server error.' });
});

// Start the server
api.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


