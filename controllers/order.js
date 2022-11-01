const OrderModel = require("../models/order");

async function addOrder(req, res) {
  const order = req.body;
  order.userID = req.user.id;
  const savedOrder = await OrderModel.create(order);
  res.json(savedOrder);
}

async function getOrders(req, res) {
  const foundOrders = await OrderModel.find({ userID: req.user.id }).populate("products", "name price");
  res.json(foundOrders);
}

module.exports = { addOrder, getOrders };
