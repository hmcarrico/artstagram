const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");

router.post("/auth/signup", controller.signup);
// router.post("/auth/login", controller.login);
// router.get("/logout", controller.logout);
// router.get("/usersession", controller.getSession);
module.exports = router;
