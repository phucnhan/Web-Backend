// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3001;

// Create connection to the database
const db = mysql.createConnection({
    host: 'db4free.net',
    user: 'phucnhan0406',
    password: 'phucnhan0406@',
    database: 'sales_clock',
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Register route for user registration
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;

    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(sql, [name, email, password], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error registering user');
            return;
        }
        res.status(201).send('User registered successfully');
    });
});

// Route for user login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(sql, [email, password], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error logging in');
            return;
        }

        if (result.length > 0) {
            res.status(200).send('Login successful');
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
