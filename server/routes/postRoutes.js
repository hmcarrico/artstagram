const express = require("express");
const router = express.Router();
const controller = require("../controllers/postController");

router.get("/feed/:id", controller.getFeed);
router.get("/user/:username", controller.getUsersPosts);
router.get("/detailed/:postId", controller.detailedPost);
router.post("/create", controller.createPost);
module.exports = router;
