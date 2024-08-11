const express = require("express");
const { home, register, login, logout } = require("../controllers/auth-controllers");
const router = express.Router();
const signupSchema = require("../validaters/auth-validator.js");
const validate = require("../middleware/validate-middleware.js");

router.route("/").get(home);
router.route("/register").post(validate(signupSchema), register);
router.route("/login").post(login);
router.route("/logout").get(logout)

module.exports = router;


