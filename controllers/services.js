const express = require("express")
const router = express.Router()
const User = require("../models/user")
const Services = require("../models/services")
const bcrypt = require("bcrypt")
const isSignedIn = require("../middleware/is-sign-in")

const index = async (req, res) => {
  try {
    const populatedServices = await Services.find().populate("userServSelected")
    res.render("services/allServices.ejs", { services: populatedServices })
  } catch (err) {
    console.log(err)
    res.redirect("/")
  }
}

const newService = async (req, res) => {
  res.render("services/new.ejs")
}

const createService = async (req, res) => {
  // console.log(req.body)

  // Check if user is authenticated
  if (!req.session.user) {
    return res.send("Unauthorized: Please log in.")
  }

  req.body.userServSelected = req.session.user._id

  try {
    const addnewService = new Services({
      nameOfService: req.body.nameOfService,
      price: req.body.price,
      userServSelected: req.session.user._id, // Adding the reference to the User
    })
    await Services.create(req.body)
    if (req.session.user.username === "Admin") {
      res.redirect("/services")
    } else {
      // Ensure `Recipe` model is imported correctly
      res.redirect(`/services/otherUsers?userId=${req.session.user._id}`)
    }
  } catch (error) {
    console.log("Error creating recipe:", error)
    res.status(500).send("Error creating service.")
  }
}

const editServices = async (req, res) => {
  try {
    const currentService = await Services.findById(req.params.serviceId)
    res.render("services/edit.ejs", {
      services: currentService,
    })
  } catch (error) {
    console.log(error)
    res.redirect("/")
  }
}

const updateServices = async (req, res) => {
  try {
    const currentService = await Services.findById(req.params.serviceId)
    await currentService.updateOne(req.body)
    res.redirect("/services")
  } catch (error) {
    console.log(error)
    res.redirect("/")
  }
}

const deleteServices = async (req, res) => {
  try {
    await Services.findByIdAndDelete(req.params.serviceId)
    if (req.session.user.username == "Admin") {
      res.redirect("/services")
    } else {
      res.redirect(`/services/otherUsers?userId=${req.session.user._id}`)
    }
  } catch (error) {
    console.error(error)
    res.redirect("/")
  }
}

const getById = async (req, res) => {
  try {
    const populatedServices = await Services.findById(
      req.params.serviceId
    ).populate("userServSelected")
    User.equal(req.session.user._id)
    res.render("services/dashBoard.ejs", { services: populatedServices })
  } catch (error) {
    console.log(error)
    res.redirect("/")
  }
}

const showServices = async (req, res) => {
  try {
    const populatedServices = await Services.find({}).populate(
      "userServSelected"
    )
    res.render("services/dashBoard", {
      services: populatedServices,
    }) // Render a views file called show.ejs
  } catch (err) {
    console.log(err)
    res.redirect("/")
  }
}

const showUsersList = async (req, res) => {
  try {
    const allUsers = await User.find()

    res.render("services/usersList.ejs", { users: allUsers })
  } catch (err) {
    console.log(err)
    res.redirect("/")
  }
}
const allUsersServices = async (req, res) => {
  try {
    const userId = req.session.user._id

    if (!userId) {
      return res.status(400).send("User ID is required.")
    }

    const allUsersServices = await Services.find({
      userServSelected: userId,
    }).populate("userServSelected")
    res.render("services/allServices", { services: allUsersServices })
  } catch (err) {
    console.log(err)
    res.redirect("/")
  }
}

module.exports = {
  allUsersServices,
  showUsersList,
  showServices,
  getById,
  deleteServices,
  updateServices,
  editServices,
  createService,
  index,
  newService,
}
