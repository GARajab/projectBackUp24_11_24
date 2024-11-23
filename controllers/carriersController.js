const express = require("express")
const router = express.Router()
const User = require("../models/user")
const Services = require("../models/services")
const bcrypt = require("bcrypt")
const isSignedIn = require("../middleware/is-sign-in")

// controllers/carriersController.js
exports.showCarriersList = async (req, res) => {
  try {
    const servicesToSelect = await Services.find()
    res.render("services/carriersList", { services: servicesToSelect }) // Ensure your view engine is set up correctly
  } catch (error) {
    console.log(error)
    res.redirect("/")
  }
}
