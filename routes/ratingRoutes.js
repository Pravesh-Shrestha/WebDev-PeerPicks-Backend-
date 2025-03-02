const express = require("express");
const router = express.Router();
const RatingController = require("../Controller/ratingController");
const upload= require("../middlewares/imageupload")

router.get("/getAllRatings", RatingController.getRatings);
router.get("/getRatingsById/:id", RatingController.getRatingById);
router.post("/addRating",upload.single("ratingImage"), RatingController.createRating);
router.put("/updateRating/:id",upload.single("ratingImage"), RatingController.updateRating);
router.delete("/deleteRating/:id", RatingController.deleteRating);

module.exports = router;
