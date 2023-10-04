const PRODUCT = require("../Model/Product")
const CATEGORY = require("../Model/Category")
module.exports = {
    getAll:  (req, res)=>{
        PRODUCT.get_all().then((value) => {
            return res.json(value)
        })
    },
    detailsProduct: (req, res) => {
        const listProduct = PRODUCT.get_all()
        const listCategory =CATEGORY.get_all()
        Promise.all([listCategory, listProduct]).then((value) => {
            res.json(value)
        })
    },
}