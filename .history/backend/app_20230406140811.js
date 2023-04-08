const express = require('express');
const app = express();


app.user(express.json());

//Route Import 
const product = require('./routes/productRoute');

module.exports = app