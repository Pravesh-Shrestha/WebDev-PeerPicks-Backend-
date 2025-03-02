const express = require("express");
const { getBusinesses, createBusiness, getBusinessById, updateBusiness, deleteBusiness } = require("../Controller/businessController");

const router = express.Router();

router.get("/", getBusinesses);
router.post("/", createBusiness);
router.get("/:id", getBusinessById);
router.put("/:id", updateBusiness);
router.delete("/:id", deleteBusiness);

module.exports = router;
