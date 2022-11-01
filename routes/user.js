const router = require("express").Router();
const userControllers = require("../controllers/user");
const { verifyTokenAndAuthorization } = require("../middleware/userauth");

// REGISTER
router.post("/register", userControllers.register);

// LOGIN
router.post("/login", userControllers.login);

// EDIT, DELETE, GET
router.patch("/:id", verifyTokenAndAuthorization, userControllers.editUser);

router.delete("/:id", verifyTokenAndAuthorization, userControllers.deleteUser);

router.get("/:id", verifyTokenAndAuthorization, userControllers.getUser);

module.exports = router;
