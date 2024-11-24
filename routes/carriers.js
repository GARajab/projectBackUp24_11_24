const express = require("express")
const router = express.Router()
const carriersController = require("../controllers/carriersController")
const Services = require("../models/services")
const isSignedIn = require("../middleware/is-sign-in")

router.get("/carriers", isSignedIn, carriersController.showCarriersList)
router.post("/addService", carriersController.showPurchasedServicesList)
module.exports = router
