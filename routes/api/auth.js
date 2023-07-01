const express = require("express");
const { register } = require("../../controllers/usersControllers");
const userSignupValidation = require('../../middlewares/validation/userSignup')

const router = express.Router();

router.post("/signup", userSignupValidation, register);
router.post("/login");
router.post("/logout");
router.get("/current");

module.exports = router;
