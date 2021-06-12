
const express = require('express');
require('dotenv').config();
const {dbConnection} = require('./db/config');
const cors = require('cors');

const app = express();

// Database
dbConnection();

// CORS

app.use(cors());

// Public directory

app.use(express.static('public'));

// Body's lecture 

app.use(express.json());

// Routes

app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


// Request listeners 

app.listen(process.env.PORT, () => {
    console.log(`Server running at port ${process.env.PORT}`);
});