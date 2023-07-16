const express = require("express");
const {
  register,
  login,
  logout,
  current,
  updateAvatar
} = require("../../controllers/usersControllers");
const userSignupValidation = require("../../middlewares/validation/userSignup");
const userSigninValidation = require("../../middlewares/validation/userSingin");
const authenticate = require("../../middlewares/validation/authenticate");
const upload = require("../../middlewares/validation/upload")

const router = express.Router();

router.post("/signup", userSignupValidation, register);
router.post("/login", userSigninValidation, login);
router.post("/logout", authenticate, logout);
router.get("/current", authenticate, current);
router.patch("/avatar", authenticate, upload.single("avatar"), updateAvatar)

module.exports = router;
