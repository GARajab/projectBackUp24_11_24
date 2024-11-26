const express = require("express")
const router = express.Router()
const carriersController = require("../controllers/carriersController")
const Services = require("../models/services")
const isSignedIn = require("../middleware/is-sign-in")

router.get("/carriers", isSignedIn, carriersController.showCarriersList)
router.post(
  "/addService",
  isSignedIn,
  carriersController.showPurchasedServicesList
)
router.get("/addFund", isSignedIn, carriersController.addFundGet)
router.post("/addFund", isSignedIn, carriersController.addFundPost)
module.exports = router
