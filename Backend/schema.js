const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    productID: {
        type: Number,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
    },
})

const userSchema = new mongoose.Schema({
    userID: {
        type: Number
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    }
})
const User = mongoose.model('users', userSchema)
const Product = mongoose.model('products', productSchema) 


module.exports = { User, Product }