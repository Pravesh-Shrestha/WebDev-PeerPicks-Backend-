const express = require("express");
const { getRatings, createRating, getRatingById, updateRating, deleteRating } = require("../Controller/ratingController");

const router = express.Router();

router.get("/", getRatings);
router.post("/", createRating);
router.get("/:id", getRatingById);
router.put("/:id", updateRating);
router.delete("/:id", deleteRating);

module.exports = router;
