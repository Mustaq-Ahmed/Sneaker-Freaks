const express = require("express")
const router = express.Router()
const { sendEmail } = require("../controllers/contact")



router.post("/contact", sendEmail )


module.exports = router