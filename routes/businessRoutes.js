const express = require("express");
const router = express.Router();
const BusinessController = require("../controllers/businessController");

router.get("/getAllBusiness", BusinessController.getBusinesses);
router.get("/getBusinessById/:id", BusinessController.getBusinessById);
router.post("/addBusiness", BusinessController.createBusiness);
router.put("/updateBusiness/:id", BusinessController.updateBusiness);
router.delete("/deleteBusiness/:id", BusinessController.deleteBusiness);

module.exports = router;
