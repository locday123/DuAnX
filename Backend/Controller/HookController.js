const CATEGORY = require("../Model/Category")
const PRODUCT = require("../Model/Product")

module.exports = {
    detailsProduct:  (req, res)=>{
        PRODUCT.get_all().then((product) => {
            CATEGORY.get_all((category) => {
                return res.json({listProduct:product, listCategory:category})
            })  
        })
    },
}