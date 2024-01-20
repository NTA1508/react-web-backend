const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Users')
const ProductModel = require('./models/Product')
const userController = require('./controller/UserController')
const productController = require('./controller/ProductController')
const jwt = require('jsonwebtoken');

const app = express()
app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

mongoose.connect("mongodb://localhost:27017/crud")

//get Users
app.get('/user', (req, res) => {
    UserModel.find()
    .then(users => res.json(users))
    .catch(err => console.log(err))
})
//create User 
app.post('/createUser', userController.CreateUser)
//get User by Id
app.get('/getUser/:id', (req, res) =>{
    UserModel.findById(req.params.id)
    .then(users => res.json(users))
    .catch(err => console.log(err))
})
//update User
app.put('/updateUser/:id', userController.UpdateUser)
//delete User
app.delete('/deleteUser/:id', (req, res) => {
    UserModel.findByIdAndDelete(req.params.id)
    .then(res.send('Delete Successfully'))
    .catch(err => res.json(err))
})
//Login
app.post('/login', userController.loginUser)
//Register
app.post('/register', userController.registerUser)
//get user
app.get('/user/:token', (req, res) => {
    const user = jwt.verify(req.params.token, 'donga@2023')
    res.json(user)
})
//get profile user
app.get('/profile/:id', (req, res) => {
    UserModel.findById(req.params.id)
    .then(users => res.json(users))
    .catch(err => console.log(err))
})
// create product 
app.post('/createProduct', productController.CreateProduct)

// get all product
app.get('/products', (req, res) => {
    ProductModel.find()
    .then(products => res.json(products))
    .catch(err => console.log(err))
})
// get product by id 
app.get('/products/:id', (req, res) =>{
    ProductModel.findById(req.params.id)
    .then(users => res.json(users))
    .catch(err => console.log(err))
})
//create product
app.post('/products/create', productController.CreateProduct)
// update product 
app.put('/products/:id', productController.UpdateProduct)
//delete product
app.delete('/products/delete/:id', (req, res) => {
    ProductModel.findByIdAndDelete(req.params.id)
    .then(res.send('Delete Successfully'))
    .catch(err => res.json(err))
})
app.listen(3001, () => {
    console.log("Server is running on port 3001")
})