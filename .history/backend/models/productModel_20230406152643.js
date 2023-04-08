const mongoose =require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter product Name"]
    },
    description: {
        type: String,
        required: [true, "Please Enter product description"]
    }
})