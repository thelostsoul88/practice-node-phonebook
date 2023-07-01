const express = require("express");
const {
  register,
  login,
  logout,
  current,
} = require("../../controllers/usersControllers");
const userSignupValidation = require("../../middlewares/validation/userSignup");
const userSigninValidation = require("../../middlewares/validation/userSingin");
const authenticate = require("../../middlewares/validation/authenticate");

const router = express.Router();

router.post("/signup", userSignupValidation, register);
router.post("/login", userSigninValidation, login);
router.post("/logout", authenticate, logout);
router.get("/current", authenticate, current);

module.exports = router;
