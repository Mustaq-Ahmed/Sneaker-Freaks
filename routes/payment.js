const express = require("express")
const router = express.Router()

const { getUserById } = require("../controllers/user")
const { isSignedIn, isAuthenticated } = require("../controllers/auth")
const { getToken, processPayment } = require("../controllers/payment")

router.param("userId", getUserById)

// GET route to generate the token
router.get("/payment/gettoken/:userId", isSignedIn, isAuthenticated, getToken)

// POST route to submit the information
router.post("/payment/braintree/:userId", isSignedIn, isAuthenticated, processPayment)

module.exports = router