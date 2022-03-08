let express = require("express")
let router = express.Router()

const { check } = require("express-validator")
const { signup, signin, signout, isSignedIn } = require("../controllers/auth")

router.post("/signup",
    [
        check("name").isLength({ min: 3 }).withMessage("Name Should be at least 3 characters"),
        check("email").isEmail().normalizeEmail().withMessage("Invalid Email"),
        check("password").isLength({ min: 3 }).withMessage("Password Should be at least 3 characters")
    ],
    signup)

router.post("/signin",
    [
        check("email").isEmail().normalizeEmail().withMessage("Invalid Email"),
        check("password").isLength({ min: 1 }).withMessage("Password field is required")
    ],
    signin)


router.get("/signout", signout)

router.get("/testroute", isSignedIn, (req, res) => {
    res.send("A Protected Route")
})

module.exports = router