const express = require("express");
const UserController = require("../Controller/userController");

const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
// Updated route to handle user profile based on `id`
router.get("/getUserById/:user_id", UserController.getProfile);



module.exports = router;
