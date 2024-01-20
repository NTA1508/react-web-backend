const asyncHandler = require("express-async-handler");
const ProductModel = require("../models/Product.js");
const cloudinary = require('../utils/cloudinary.js');


const CreateProduct = asyncHandler(async (req,res) => {
    var productName = req.body.productName
    var image = req.body.image
    var productType = req.body.productType
    var description = req.body.description
    var price = req.body.price
    var sales = req.body.sales
    var promotionType = req.body.promotionType
    var storageAddress = req.body.storageAddress
    var stock = req.body.stock
    try {
        if (image){
            const uploadRes = await cloudinary.uploader.upload(image, {
                upload_preset: 'product'
            })
            if (uploadRes) {
                ProductModel.create({
                    product_name: productName,
                    product_image: uploadRes.url,
                    type: productType,
                    deciption: description,
                    price: price,
                    sales: sales,
                    sale_type: promotionType,
                    storage_address: storageAddress,
                    stock_number: stock
                })
                .then(product => res.json(product))
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

const UpdateProduct = asyncHandler(async (req, res) => {
    var id = req.params.id
    var productName = req.body.productName
    var image = req.body.image
    var productType = req.body.productType
    var description = req.body.description
    var price = req.body.price
    var sales = req.body.sales
    var promotionType = req.body.promotionType
    var storageAddress = req.body.storageAddress
    var stock = req.body.stock

    try {
        if (image){
            const uploadRes = await cloudinary.uploader.upload(image, {
                upload_preset: 'product'
            })
            if (uploadRes) {
                ProductModel.findByIdAndUpdate({_id : id},{
                    product_name: productName,
                    product_image: uploadRes.url,
                    type: productType,
                    description: description,
                    price: price,
                    sales: sales,
                    sale_type: promotionType,
                    storageAddress: storageAddress,
                    stock: stock,
                })
                .then(product => res.json(product))
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

module.exports = {CreateProduct, UpdateProduct}