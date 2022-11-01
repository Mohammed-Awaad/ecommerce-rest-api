const router = require("express").Router();
const productControllers = require("../controllers/product");
const { verifyToken, verifyTokenAndAuthorization } = require("../middleware/sellerauth");
const userAuth = require("../middleware/userauth");

// GET
router.get("/", productControllers.getProducts);

// ADD
router.post("/", verifyToken, productControllers.addProducts);

// EDIT, DELETE
router.patch("/:id", verifyToken, productControllers.editProduct);
router.delete("/:id", verifyToken, productControllers.deleteProduct);

// GET SPECIFIC SELLER PRODUCTS
router.get("/seller/:id", verifyTokenAndAuthorization, productControllers.getSpecificSellerProduct);

// SEARCH
router.get("/search", userAuth.verifyToken, productControllers.search);
// router.get("/:name", userAuth.verifyToken, productControllers.searchBySellerName);

module.exports = router;
