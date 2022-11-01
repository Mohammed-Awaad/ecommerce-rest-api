const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    sellerID: { type: mongoose.Schema.Types.ObjectId, ref: "Seller", required: true },
  },
  { timestamps: true }
);

ProductSchema.virtual("seller", {
  ref: "Seller",
  localField: "sellerID",
  foreignField: "_id",
  justOne: true,
});
ProductSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Product", ProductSchema);
