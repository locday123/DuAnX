const Category = require('../Model/Category')

module.exports = {
    getAll:  (req, res)=>{
        Category.get_all().then((value)=>{
            return res.json(value)
        })
    },
}