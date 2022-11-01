const ProductModel = require("../models/product");
const SellerModel = require("../models/seller");

// GET
async function getProducts(req, res) {
  try {
    const products = await ProductModel.find().populate("seller", { _id: 0, name: 1 });
    res.status(200).json(products);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

// ADD
async function addProducts(req, res) {
  try {
    const product = req.body;
    product.sellerID = req.seller.id;
    const savedProduct = await ProductModel.create(product);
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// EDIT, DELETE
async function editProduct(req, res) {
  try {
    const foundProduct = await ProductModel.findById(req.params.id);
    if (req.seller.id === foundProduct.sellerID.toString()) {
      const updatedProduct = await ProductModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { runValidators: true, new: true });
      res.status(200).json(updatedProduct);
    } else res.status(403).json("You are not allowed to do that!");
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
}

async function deleteProduct(req, res) {
  try {
    const foundProduct = await ProductModel.findById(req.params.id);
    if (req.seller.id === foundProduct.sellerID.toString()) {
      await ProductModel.findByIdAndDelete(req.params.id);
      res.status(200).json("Product has been deleted...");
    } else res.status(403).json("You are not allowed to do that!");
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
}

// GET SPECIFIC SELLER PRODUCTS
async function getSpecificSellerProduct(req, res) {
  try {
    const products = await ProductModel.find({ sellerID: req.params.id }).populate("seller", { _id: 0, name: 1 });
    res.status(200).json(products);
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
}

// SEARCH
async function search(req, res) {
  try {
    if (req.query.name) {
      const foundProduct = await ProductModel.find({ name: { $regex: req.query.name, $options: "i" } });
      if (foundProduct[0]) res.status(200).json(foundProduct).populate("seller", { _id: 0, name: 1 });
      else res.status(404).json("NOT FOUND!");
    } else if (req.query.seller) {
      const foundSeller = await SellerModel.find({ name: { $regex: req.query.seller, $options: "i" } });
      if (foundSeller[0]) {
        const SID = foundSeller[0].id;
        const foundProduct = await ProductModel.find({ sellerID: SID }).populate("seller", { _id: 0, name: 1 });
        if (foundProduct[0]) res.status(200).json(foundProduct);
        else res.status(404).json("NOT FOUND!");
      } else {
        res.status(404).json("NOT FOUND!");
      }
    } else res.status(404).json("NOT FOUND!");
  } catch (err) {
    res.status(405).json({ error: err.message });
  }
}

module.exports = { getProducts, addProducts, editProduct, deleteProduct, getSpecificSellerProduct, search };
