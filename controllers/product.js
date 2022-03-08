const Product = require("../models/product")
const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs") 

exports.getProductById = (req, res, next, id) => {

    Product.findById(id)
        .populate("category") 
        .exec((err, product) => {
            if (err || !product) {
                return res.status(400).json({
                    error: "No Product Found in DB"
                })
            }
            req.product = product
            next()
        })
} 

exports.createProduct = (req, res) => {

    let form = new formidable.IncomingForm()
    form.keepExtensions = true  

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "Problem with Image"
            })
        }
       
        const { name, description, price, category, stock, size } = fields

        if (!name || !description || !price || !category || !stock || !size) {
            return res.status(400).json({
                error: "Please Include all the fields"
            })
        }
       
        let product = new Product(fields)

        if (file.photo) {
            if (file.photo.size > 3000000) {    
                return res.status(400).json({
                    error: "File size is too big"
                })
            }
           
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type   
        }
      
        product.save((err, product) => {
            if (err) {
                return res.status(400).json({
                    error: "Saving Tshirt in DB Failed"
                })
            }
            res.json(product)
        })

    })

}

exports.getProduct = (req, res) => {
    req.product.photo = undefined
    return res.json(req.product)
}

exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}

exports.removeProduct = (req, res) => {
    let product = req.product

    product.remove((err, deletedProduct) => {
        if (err || !deletedProduct) {
            return res.status(400).json({
                error: "Failed to delete the Product"
            })
        }
        res.json({
            message: `Successfully Deleted Product: ${deletedProduct}`
        })
    })
}

/*
for updateProduct same UI as a save/createProduct
PLAN : as soon as Updation Page Load, we are gonna pull up the data from the database, 
we will fill up the fields with that information as soon as user hit the save we are gonna save the data.
IMP : same data is getting pulled from database and same data is getting saved in the database
*/
exports.updateProduct = (req, res) => {

    let form = new formidable.IncomingForm()
    form.keepExtensions = true  

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "Problem with Image"
            })
        }

       
        let product = req.product  

        product = _.extend(product, fields)

      
        if (file.photo) {
            if (file.photo.size > 3000000) {    
                return res.status(400).json({
                    error: "File size is too big"
                })
            }

            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type    
        }
      
        product.save((err, product) => {
            if (err) {
                return res.status(400).json({
                    error: "Updation of Product Failed"
                })
            }
            res.json(product)
        })

    })
}


exports.getAllProducts = (req, res) => {
    // let limit = req.query.limit ? parseInt(req.query.limit) : 8
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"

    Product.find({})
        .select("-photo")   
        .populate("category")
        .sort([[sortBy, "asc"]])
        // .limit(limit)
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: "NO PRODUCT FOUND"
                })
            }
            return res.json(products)
        })
}


exports.getAllUniqueCategories = (req, res) => {
    Product.distinct("category", {}, (err, category) => {
        if (err) {
            return res.status(400).json({
                error: "No Category Found"
            })
        }
        return res.json(category)   
    })
}

exports.updateStock = (req, res, next) => {

    let myOperations = req.body.order.products.map((prod) => {
        return {
            updateOne: {
                filter: { _id: prod._id },
                update: { $inc: { stock: -prod.count, sold: +prod.count } }
            }
        }
    })

    Product.bulkWrite(myOperations, {}, (err, products) => {
        if (err) {
            return res.status(400).json({
                error: "Bulk Operation Failed"
            })
        }
        next()
    })
}


