const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const generteToken = require("../config/generateToken");

//signUp
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  //checking if all fields are there
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields.");
  }

  //check if email already register
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //registering new user
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generteToken(user._id),
    });
  } else {
    throw new Error("Failed to create User.");
  }
});

//login
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //checking if user exists
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error(" No user registered with this email.");
  }

  //checking password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new Error("Incorrect password.");
  }

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    pic: user.pic,
    token: generteToken(user._id),
  });
});

const getAllUser = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

module.exports = { registerUser, authUser, getAllUser };
