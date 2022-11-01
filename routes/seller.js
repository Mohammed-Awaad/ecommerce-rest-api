const router = require("express").Router();
const sellerControllers = require("../controllers/seller");
const { verifyTokenAndAuthorization } = require("../middleware/sellerauth");

// REGISTER
router.post("/register", sellerControllers.register);

// LOGIN
router.post("/login", sellerControllers.login);

// EDIT, DELETE, GET
router.patch("/:id", verifyTokenAndAuthorization, sellerControllers.editSeller);

router.delete("/:id", verifyTokenAndAuthorization, sellerControllers.deleteSeller);

router.get("/:id", verifyTokenAndAuthorization, sellerControllers.getSeller);

module.exports = router;
