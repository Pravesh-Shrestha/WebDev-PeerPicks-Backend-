const express = require("express");
const router = express.Router();
const RatingController = require("../controllers/ratingController");

router.get("/getAllRatings", RatingController.getRatings);
router.get("/getRatingsById/:id", RatingController.getRatingById);
router.post("/addRating", RatingController.createRating);
router.put("/updateRating/:id", RatingController.updateRating);
router.delete("/deleteRating/:id", RatingController.deleteRating);

module.exports = router;
