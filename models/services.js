const mongoose = require("mongoose")

const servicesSchema = new mongoose.Schema({
  nameOfService: { type: String, required: true },
  price: { type: Number, required: true },
  userServSelected: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
})

const Services = mongoose.model("services", servicesSchema)
module.exports = Services
