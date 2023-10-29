const PRODUCT = require("../Model/Product")
const CATEGORY = require("../Model/Category")
const STORAGE = require("../Model/Storage")
module.exports = {
    getAll:  (req, res)=>{
        PRODUCT.get_all().then((value) => {
            return res.json(value)
        })
    },
    detailsProduct: (req, res) => {
        const listProduct = PRODUCT.get_all()
        const listCategory = CATEGORY.get_all()
        const listStorage = STORAGE.get_all()
        Promise.all([listCategory, listProduct, listStorage]).then((value) => {
            res.json(value)
        })
    },
}