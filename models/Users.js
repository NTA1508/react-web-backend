const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    address: String,
    password: String,
    idAdmin: {type: Boolean, default: false},
})

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel