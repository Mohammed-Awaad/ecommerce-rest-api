const mongoose = require("mongoose");

const SellerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, minLength: 3 },
    username: { type: String, required: true, unique: true, minLength: 3 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Seller", SellerSchema);
