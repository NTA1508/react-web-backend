const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_image: {
        type: String,
        required: true,
    },
    product_name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    rate: {
        type: Number,
        required: true,
    },
    sales: {
        type: Number,
        required: true,
    },
    sale_type: {
        type: String,
        required: true,
    },
    storage_address: {
        type: String,
        required: true,
    },
    stock_number: {
        type: Number,
        required: true,
    },
});

const Products = mongoose.model('products', productSchema);

module.exports = Products;
