const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/api/greet', (req, res) => {
    const { name } = req.body;
    if (name) {
        res.json({ message: `Hello, ${name}!` });
    } else {
        res.status(400).json({ error: 'Name is required' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
