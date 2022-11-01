const SellerModel = require("../models/seller");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const saltRounds = 10;

// REGISTER
async function register(req, res) {
  try {
    const seller = req.body;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(seller.password, salt);
    seller.password = hash;
    const savedSeller = await SellerModel.create(seller);
    const token = jwt.sign({ id: savedSeller._id }, process.env.JWT_SECRET, { expiresIn: "3d" });
    const { password, ...others } = savedSeller._doc;
    res.status(201).json({ ...others, accessToken: token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// LOGIN
async function login(req, res) {
  try {
    const seller = req.body;
    const foundSeller = await SellerModel.findOne({ username: seller.username });
    if (foundSeller) {
      passwordIsValid = bcrypt.compareSync(seller.password, foundSeller.password);
      if (passwordIsValid) {
        const token = jwt.sign({ id: foundSeller._id }, process.env.JWT_SECRET, { expiresIn: "3d" });
        const { password, ...others } = foundSeller._doc;
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
async function editSeller(req, res) {
  try {
    const seller = req.body;
    if (seller.password) {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(seller.password, salt);
      seller.password = hash;
    }
    const updatedSeller = await SellerModel.findByIdAndUpdate(req.params.id, { $set: seller }, { runValidators: true, new: true });
    res.status(200).json(updatedSeller);
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
}

async function deleteSeller(req, res) {
  try {
    await SellerModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Seller has been deleted...");
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
}

async function getSeller(req, res) {
  try {
    const foundSeller = await SellerModel.findById(req.params.id);
    const { password, ...others } = foundSeller._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
}

module.exports = { register, login, editSeller, deleteSeller, getSeller };
