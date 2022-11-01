const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    productsID: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }] },
  },
  { timestamps: true }
);

OrderSchema.virtual("products", {
  ref: "Product",
  localField: "productsID",
  foreignField: "_id",
});
OrderSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Order", OrderSchema);
