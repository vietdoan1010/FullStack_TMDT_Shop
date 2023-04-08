const mongoose =require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter product Name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please Enter product description"]
    },
    price: {
        type: Number,
        required: [true, "Please Enter product price"],
        maxLength: [8, "Price cannot excced 8 characters"]
    },
    rating: {
        type: Number, 
        default: 0
    }
})