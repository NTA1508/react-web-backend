const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    product_image: String,
    product_name: String,
    type: String,
    deciption: String,
    price: Number,
    rate: {type: Number, default:0},
    sales: Number,
    sale_type: String,
    storage_address: String,
    stock_number: Number
})

const ProductModel = mongoose.model("products", UserSchema)
module.exports = ProductModel