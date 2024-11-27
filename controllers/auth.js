const express = require("express")
const router = express.Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")
const messages = require("../middleware/display-message")
const flash = require("express-flash")
const session = require("express-session")
const Toastify = require("toastify-js")
// const showMsg = (req, res) => {
//   req.flash("info", "Flash Message Added")
//   res.redirect("/show-flash-message")
// }

// const flashMsg = (req, res) => {
//   res.render("index", { messages: req.flash("info") })
// }

const signup_get = (req, res) => {
  res.render("auth/sign-up")
}

const signup_post = async (req, res) => {
  const userInDatabase = await User.findOne({ username: req.body.username })
  if (userInDatabase) {
    return res.send("Username already in database")
  }
  if (req.body.password !== req.body.confirmPassword) {
    return res.send("Passwords do not match")
  }
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassword
    const user = await User.create(req.body)
    req.session.messages = `Thank You ${req.body.username} Now You Can Sign In And Use Our Services`
    res.redirect("/auth/sign-in")
  } catch {
    // console.log(error);
    return res.send("Failed to create user. Please try again.")
  }
}

const signin_get = (req, res) => {
  res.render("auth/sign-in.ejs")
}

const signin_post = async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username })
    if (!userInDatabase) {
      return res.redirect("/auth/sign-in")
    }
    const validPassword = bcrypt.compareSync(
      req.body.password,
      userInDatabase.password
    )
    if (!validPassword) {
      return res.send("Login Failed. Please try again.")
    }
    req.session.user = {
      username: userInDatabase.username,
      _id: userInDatabase._id,
      createdAt: userInDatabase.createdAt,
      balance: userInDatabase.balance,
      email: userInDatabase.email,
      address: userInDatabase.address,
      phoneNumber: userInDatabase.phoneNumber,
    }
    res.locals.messages = `Welcome Back ${req.session.user.username} Enjoy Using Our Services!`
    res.render("services/dashBoard", {
      user: req.session.user,
      messages: res.locals.messages,
    })
  } catch (err) {
    console.log(err)
    res.redirect("/auth/sign-in")
  }
}

const signout = (req, res) => {
  req.session.destroy()
  res.redirect("/auth/sign-in")
}

module.exports = {
  signout,
  signin_post,
  signin_get,
  signup_post,
  signup_get,
  router,
}
