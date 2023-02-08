require("dotenv").config()
const path = require("path")
const express = require("express")
const mongoose = require('mongoose');
const app = express()
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const productRoutes = require("./routes/product")
const orderRoutes = require("./routes/order")
const paymentRoutes = require("./routes/payment")
const contactRoutes = require("./routes/contact")

// DB Connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log("DB CONNECTED")).catch((err) => console.log(err))

// Middleware Functions
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

// Routes
app.use("/api", authRoutes)
app.use("/api", userRoutes)
app.use("/api", categoryRoutes)
app.use("/api", productRoutes)
app.use("/api", orderRoutes)
app.use("/api", paymentRoutes)
app.use("/api", contactRoutes)

// Serve Frontend
if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'))
    app.get('*', (req, res) =>
        res.sendFile(
            path.resolve(__dirname, 'client', 'build', 'index.html')
        )
    )
}else{
    app.get("/", (req, res) => res.send("Please Setup to Production")) 
}

// Port
const port = process.env.PORT || 8000

// Starting a Server...
app.listen(port, () => console.log(`App is running at ${port}`))