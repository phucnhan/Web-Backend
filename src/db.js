const mysql = require('mysql2/promise'); // Import the promise-based version

// Database configuration for MySQL
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 60000,
});


// Function to create a new user
const createUser = async (username, email, password) => {
    const connection = await pool.getConnection();
    try {
        await connection.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
        console.log('User created successfully');
    } finally {
        connection.release();
    }
};

// Function to find a user by email
const findUserByEmail = async (email) => {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    } finally {
        connection.release();
    }
};

const createProduct = async (name, price, description, image_path) => {
    const connection = await pool.getConnection();
    try {
        await connection.execute('INSERT INTO products (name, price, description, image_path) VALUES (?, ?, ?, ?)', [name, price, description, image_path]);
        console.log('Product created successfully');
    } finally {
        connection.release();
    }
};

const fetchProducts = async () => {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.execute('SELECT * FROM products');
        return rows;
    } finally {
        connection.release();
    }
};

const updateProduct = async (id, updatedFields) => {
    const connection = await pool.getConnection();
    try {
        const { name, price, description, image_path } = updatedFields;
        const [result] = await connection.execute(
            'UPDATE products SET name = ?, price = ?, description = ?, image_path = ? WHERE id = ?',
            [name, price, description, image_path, id]
        );
        console.log('Product updated successfully');
        return result;
    } finally {
        connection.release();
    }
};


const deleteProduct = async (id) => {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.execute('DELETE FROM products WHERE id = ?', [id]);
        console.log('Product deleted successfully');
        return result;
    } finally {
        connection.release();
    }
};

const findProductById = async (id) => {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
        return rows[0];
    } finally {
        connection.release();
    }
};


module.exports = { createUser, findUserByEmail, createProduct, fetchProducts, updateProduct, deleteProduct, findProductById };

