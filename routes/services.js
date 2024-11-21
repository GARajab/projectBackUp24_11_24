const express = require("express")
const router = express.Router()
const servicesController = require("../controllers/services")

// Define the route for usersList to display a list of users
router.get("/usersList", servicesController.showUsersList)

// Define the route for viewing other users' service
router.get("/otherUsers", servicesController.allUsersServices)

// Other routes follow
router.get("/dashBoard", servicesController.showServices)
router.get("/", servicesController.index)
router.get("/new", servicesController.newService)
router.get("/:serviceId", servicesController.getById)
router.post("/", servicesController.createService)
router.get("/:serviceId/edit", servicesController.editServices)
router.put("/:serviceId", servicesController.updateServices)
router.delete("/:serviceId", servicesController.deleteServices)
router.get("/list", servicesController.selectedService)

module.exports = router
