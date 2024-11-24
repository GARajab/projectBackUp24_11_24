const mongoose = require("mongoose")

const serviceSchema = new mongoose.Schema({
  nameOfService: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  IMEI: {
    type: String,
    required: true,
  },
  userServSelected: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
})

const Services = mongoose.model("Services", serviceSchema)
module.exports = Services
