const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const UserModel = require("../models/Users.js");
const jwt = require('jsonwebtoken');
const passOfProject = 'donga@2023';
const cloudinary = require('../utils/cloudinary.js')


const registerUser = asyncHandler(async (req, res) => {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var password = req.body.password;
  try {
    const userExists = await UserModel.findOne({ email });
    //check if user exists
    if (userExists) {
      res.status(400);
      throw new Error("email da ton tai");
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user in DB
    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      address: "",
      avatar: "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg",
      password: hashedPassword,
    });

    // created successfully
    if (user) {
      res.status(200);
      res.json({
        message: "dang ky thanh cong",
      });
    } else {
      res.status(400);
      throw new Error("user da ton tai");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  console.log(email, password);
  try {
    //find user in DB
    const user = await UserModel.findOne({ email });
    console.log(user)
    const check = bcrypt.compareSync(req.body.password, user.password);
    // console.log(check)
    if (check) {
        var token = jwt.sign({ id: user.id, firstName: user.firstName, lastName : user.lastName, avatar: user.avatar, email: user.email,isAdmin: user.idAdmin, address: user.address }, passOfProject, { expiresIn: "3h" })
        res.json({
          // id : user.id,
          // fisrtName: user.firstName,
          // lastName: user.lastName,
          // email: user.email,
          // address: user.address,
          // avatar: user.avatar,
          // isAdmin: user.isAdmin
          token: token
        });
    } else {
      res.status(201);
      res.json({ message: "mat khau khong dung" });
    }
  } catch (error) {
    res.status(401);
    res.json({ message: "User khong ton tai" });
  }
});

const UpdateUser = asyncHandler(async (req, res)=>{
  const id = req.params.id;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var address = req.body.address;
  var currentpass = req.body.currentpass;
  var newpass = req.body.newpass;
  // console.log(newpass)
  console.log({currentpass, newpass})
  try {
    const user = await UserModel.findById({_id : id});
    console.log(user)
    const check = bcrypt.compareSync(currentpass, user.password);
    console.log(check)
    if (currentpass == ''){
      const user = await UserModel.findByIdAndUpdate({_id: id}, {
        firstName: firstName,
        lastName : lastName,
        email : email,
        address : address
      })
      res.json({message: "update thanh cong"})
    }

    if (currentpass != ''){
      if (check) {
        if(newpass != ''){
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(newpass, salt);
          const user = await UserModel.findByIdAndUpdate({_id: id},{firstName: firstName, lastName: lastName, email: email, address:address, password:hashedPassword})
          res.status(201)
          res.json({message: "đổi mặt khẩu thành công"})
        }else{
          res.status(202)
          res.json({message: "chưa nhập mật khẩu mới"})
        }
      }else{
        res.status(203)
        res.json({message: "mật khâu hiện tại không khớp"})
      }
    }
  } catch (error) {
    res.status(401);
  }
})

const CreateUser = asyncHandler(async (req,res) => {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var avatar = req.body.avatar;
  try {
      if (avatar){
          const uploadRes = await cloudinary.uploader.upload(avatar, {
              upload_preset: 'users'
          })
          if (uploadRes) {
              UserModel.create({
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                  avatar: uploadRes.url,
              })
              .then(users => res.json(users))
          }
      }
  } catch (error) {
      console.log(error);
      res.status(500).send(error);
  }
})
module.exports = { loginUser, registerUser, UpdateUser, CreateUser };
