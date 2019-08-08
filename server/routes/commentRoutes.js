const express = require("express");
const router = express.Router();
const controller = require("../controllers/commentController");

router.get("/get_comments_for_post/:postId", controller.getCommentsForPost);
router.post("/create", controller.postComment);
module.exports = router;
