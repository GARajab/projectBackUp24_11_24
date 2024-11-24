const express = require("express")
const router = express.Router()
const User = require("../models/user")
const Services = require("../models/services")
// const bcrypt = require("bcrypt")
// const isSignedIn = require("../middleware/is-sign-in")

// controllers/carriersController.js
exports.showCarriersList = async (req, res) => {
  try {
    const servicesToSelect = await Services.find()
    res.render("../views/services/carriersList.ejs", {
      services: servicesToSelect,
    }) // Ensure your view engine is set up correctly
  } catch (error) {
    console.log(error)
    res.redirect("/")
  }
}

exports.showPurchasedServicesList = async (req, res) => {
  if (!req.session.user) {
    return res.send("Unauthorized: Please log in.")
  }
  try {
    const service = await Services.findById(req.body.nameOfServiceID)

    if (!service) {
      return res.status(404).send("Service not found.")
    }

    const addnewService = new Services({
      nameOfService: service.nameOfService,
      price: req.body.price,
      IMEI: req.body.IMEI,
      userServSelected: req.session.user._id,
    })
    req.session.user.balance -= req.body.price
    await User.findByIdAndUpdate(req.session.user._id, {
      balance: req.session.user.balance,
    })
    await Services.create(addnewService)
    res.redirect(`/services/otherUsers?userId=${req.session.user._id}`)
  } catch (error) {
    console.log(error)
    res.status(500).send("Error assign service to current session user.")
  }
}
