const express = require("express");
const router = express.Router();
const controller = require("../controllers/usersController");

router.get("/:username", controller.getUserProfileData);
module.exports = router;
