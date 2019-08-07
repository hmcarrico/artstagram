const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");

router.post("/signup", controller.signup);
router.post("/login", controller.login);
router.get("/logout", controller.logout);
router.get("/usersession", controller.getSession);
router.get("/verifyUsername/:username", controller.checkAvailableUsernames);
router.get("/verifyEmail/:email", controller.checkAvailableEmail);
module.exports = router;
