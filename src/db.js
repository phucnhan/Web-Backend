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
    connectTimeout: 15000,
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

module.exports = { createUser, findUserByEmail };
