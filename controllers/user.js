const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const saltRounds = 10;

// REGISTER
async function register(req, res) {
  try {
    const user = req.body;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    const savedUser = await UserModel.create(user);
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: "3d" });
    const { password, ...others } = savedUser._doc;
    res.status(201).json({ ...others, accessToken: token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// LOGIN
async function login(req, res) {
  try {
    const user = req.body;
    const foundUser = await UserModel.findOne({ username: user.username });
    if (foundUser) {
      passwordIsValid = bcrypt.compareSync(user.password, foundUser.password);
      if (passwordIsValid) {
        const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET, { expiresIn: "3d" });
        const { password, ...others } = foundUser._doc;
        res.status(200).json({ ...others, accessToken: token });
      } else {
        res.status(401).json("Username or password is not valid.");
      }
    } else {
      res.status(401).json("Username or password is not valid.");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// EDIT, DELETE, GET
async function editUser(req, res) {
  try {
    const user = req.body;
    if (user.password) {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(user.password, salt);
      user.password = hash;
    }
    const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, { $set: user }, { runValidators: true, new: true });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
}

async function deleteUser(req, res) {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
}

async function getUser(req, res) {
  try {
    const foundUser = await UserModel.findById(req.params.id);
    const { password, ...others } = foundUser._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
}

module.exports = { register, login, editUser, deleteUser, getUser };
