const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({

    name: {
        type: 'String',
    }
})