const router = require("express").Router();
var userController = require("../controllers/userController.js");

router.post("/signup", userController.userSignup);
router.post("/login", userController.userLogin);
router.post("/verify", userController.verifyUser);
module.exports = router;
