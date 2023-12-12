const express = require('express');
const path = require('path');

const app = express();

// Serve static files (images) from multiple folders
app.use('/category', express.static(path.join(__dirname, 'category')));
app.use('/manufacturer', express.static(path.join(__dirname, 'manufacturer')));
app.use('/product', express.static(path.join(__dirname, 'product')));
// Add more lines for additional image folders as needed

// ... (other configuration and routes)

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
