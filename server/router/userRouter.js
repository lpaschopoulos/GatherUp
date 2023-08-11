const router = require("express").Router();
var userController = require("../controllers/userController.js");

router.post("/signup", userController.userSignup);
router.post("/login", userController.userLogin);
router.post("/verify", userController.verifyUser);
router.get("/:id", userController.findById);
router.put("/:id", userController.updateUserById);
router.delete("/:id", userController.deleteUserById);
router.get('/getUsernames', userController.getUsernames); // Use a GET request here



module.exports = router;
