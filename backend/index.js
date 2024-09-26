const express = require('express');
const app = express();
const port = 5000;
const mongodb = require('./db');

// Uncomment this to connect to MongoDB
mongodb();

// CORS configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://foodquest-six.vercel.app");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json()); // Ensure this is before your routes

app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrdersData"));

// Simple test route
app.get('/', (req, res) => {
    res.send("Hello Ankit");
});


// API routes

// Start server
app.listen(port, () => {
    console.log(`Your server is running on port ${port}`);
});
