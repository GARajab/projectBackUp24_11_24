const express = require("express")
const router = express.Router()
const servicesController = require("../controllers/services")
const isSignedIn = require("../middleware/is-sign-in")
const isAdmin = require("../middleware/is-Admin")

router.get("/usersList", isSignedIn, isAdmin, servicesController.showUsersList)
router.get("/otherUsers", isSignedIn, servicesController.allUsersServices)
router.get("/dashBoard", isSignedIn, servicesController.showServices)
router.get("/", isSignedIn, servicesController.index)
router.get("/new", isSignedIn, servicesController.newService)
router.get("/:serviceId", isSignedIn, servicesController.getById)
router.post("/", isSignedIn, servicesController.createService)
router.get(
  "/:serviceId/edit",
  isSignedIn,

  servicesController.editServices
)
router.put(
  "/:serviceId",
  isSignedIn,

  servicesController.updateServices
)
router.delete(
  "/:serviceId",
  isSignedIn,

  servicesController.deleteServices
)
router.get("/carriers", isSignedIn, servicesController.getCarrierList)
module.exports = router
