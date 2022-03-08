const User = require("../models/user")
const { validationResult } = require("express-validator")
let jwt = require("jsonwebtoken")
let expressJwt = require("express-jwt")


exports.signup = (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }
    const user = new User(req.body)
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                error: "Not able to save User in Database...!"
            })
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        })
    })
}


exports.signin = (req, res) => {
    const errors = validationResult(req)
    const { email, password } = req.body

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: " User Email Does not Exists"
            })
        }

        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and Password do not match"
            })
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET)
        res.cookie("token", token, { expire: new Date() + 9999 })

        const { _id, name, email, role } = user
        return res.json({ token, user: { _id, name, email, role } })
    })
}

exports.signout = (req, res) => {
    res.clearCookie("token")
    res.json({
        message: "User Signout Succesfully",
    })
}

exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
})



exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth.id
    if (!checker) {
        return res.status(403).json({
            error: "Access Denied"
        })
    }
    next()
}

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "You are not Admin, Access Denied"
        })
    }
    next()
}