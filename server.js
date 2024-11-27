const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const app = express()
const session = require("express-session")
const mongoose = require("mongoose")
const methodOverRide = require("method-override")
const morgan = require("morgan")
const addServiceRouter = require("./routes/carriers.js")
const passUserToView = require("./middleware/pass-user-to-view")
const authRouter = require("./routes/auth.js")
const servicesRouter = require("./routes/services.js")
const carriersRoutes = require("./routes/carriers")
const getMessages = require("./middleware/display-message.js")
const flash = require("express-flash")

const port = process.env.PORT ? process.env.PORT : 3000

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on("connected", () => {
  console.log(`Database is connected its name is : ${mongoose.connection.name}`)
})

app.use(express.urlencoded({ extended: false }))
app.use(methodOverRide("_method"))
app.use(morgan("dev"))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)

app.set("view engine", "ejs")
app.use(flash())
app.use(getMessages)

app.use(passUserToView)

app.use(carriersRoutes)

app.use("/auth", authRouter)

app.use("/services", servicesRouter)

app.use("/addService", addServiceRouter)

app.get("/", async (req, res) => {
  res.render("auth/sign-in.ejs")
})

app.listen(port, () => {
  console.log(`localhost:${port}`)
})
