const PRODUCT = require("../Model/Product")

module.exports = {
    getAll:  (req, res)=>{
        PRODUCT.get_all().then((value) => {
            return res.json(value)
        })
    },
}