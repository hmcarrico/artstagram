const express = require("express");
const router = express.Router();
const controller = require("../controllers/postController");

router.get("/user/:username", controller.getUsersPosts);
module.exports = router;
