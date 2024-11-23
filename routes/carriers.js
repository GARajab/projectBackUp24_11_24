const express = require("express")
const router = express.Router()
const carriersController = require("../controllers/carriersController")
const Services = require("../models/services")

router.get("/carriers", carriersController.showCarriersList)
module.exports = router
