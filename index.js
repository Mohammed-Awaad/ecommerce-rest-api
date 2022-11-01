const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoute = require("./routes/user");
const sellerRoute = require("./routes/seller");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");

const app = express();
const PORT = 3031;

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("** Database connected successfully! **");
  })
  .catch((err) => {
    console.log(`** Unable to connect to database => ${err.message} **`);
  });

app.use(cors());
app.use(express.json());

app.use("/users", userRoute);
app.use("/sellers", sellerRoute);
app.use("/products", productRoute);
app.use("/orders", orderRoute);
app.use("*", (req, res) => {
  res.status(404).json("NOT FOUND!");
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`** App listening on port ${process.env.PORT || PORT} **`);
});
