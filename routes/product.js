const express = require("express")
const router = express.Router()

const { getProductById, createProduct, getProduct, photo, updateProduct, removeProduct, getAllProducts, getAllUniqueCategories } = require("../controllers/product")
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth")
const { getUserById } = require("../controllers/user")


router.param("userId", getUserById)
router.param("productId", getProductById)


// create product.
router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct)

// read product
router.get("/product/:productId", getProduct)
router.get("/product/photo/:productId", photo)

// update 
router.put("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, updateProduct)

// delete
router.delete("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, removeProduct)

// listing route
router.get("/products", getAllProducts)

// All Distinct Categories.
router.get("/products/categories", getAllUniqueCategories)

module.exports = router