const router = require("express").Router();
const orderControllers = require("../controllers/order");
const { verifyToken } = require("../middleware/userauth");

router.post("/", verifyToken, orderControllers.addOrder);

router.get("/", verifyToken, orderControllers.getOrders);

module.exports = router;
