const Category = require("../models/category")

exports.getCategoryById = (req, res, next, id) => {

    Category.findById(id).exec((err, cate) => {  
        if (err) {
            return res.status(400).json({
                error: "No Category found in DB"
            })
        }
        req.category = cate
        next()
    })
}

exports.createCategory = (req, res) => {
    const category = new Category(req.body)
    category.save((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: "Not able to save Category in DB"
            })
        }
        return res.json({ category })
    })
}


exports.getCategory = (req, res) => {
    return res.json(req.category)
}


exports.getAllCategories = (req, res) => {
    Category.find({}).exec((err, categories) => {
        if (err || !categories) {
            return res.status(400).json({
                error: "No Categories found in DB"
            })
        }
        return res.json(categories)
    })
}


exports.updateCategory = (req, res) => {

    const category = req.category     
    category.name = req.body.name
    category.save((err, updatedCategory) => {
        if (err || !updatedCategory) {
            return res.status(400).json({
                error: "Failed to Update Category"
            })
        }
        return res.json(updatedCategory)
    })
}

exports.removeCategory = (req, res) => {
    const category = req.category
    category.remove((err, category) => {  
        if (err) {
            return res.status(400).json({
                error: "Failed to Delete this Category"
            })
        }
        return res.json({
            message: `Successfully Deleted Category : ${category.name}`
        })
    })
}