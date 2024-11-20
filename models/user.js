const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: [3, "Name must be more than 3 characters"],
      maxlength: [10, "Name must be less than or equal to 10 characters"],
    },
    password: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
  },

  { timestamps: true }
)

const User = mongoose.model("User", userSchema)
module.exports = User
