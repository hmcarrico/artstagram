const express = require("express");
const router = express.Router();
const controller = require("../controllers/followController");

router.get("/followerWhoFollowMe/:personWhoIsFollowed", controller.getWhoFollowsYou);
router.get("/whoIAmFollowing/:personWhoFollows", controller.getWhoYouAreFollowing);
router.get("/getfollowrequest/:personWhoIsFollowed", controller.getFollowRequest);
router.post("/followrequest", controller.createFollowRequest);
router.put("/acceptfollowrequest", controller.acceptFollowRequest);
module.exports = router;
