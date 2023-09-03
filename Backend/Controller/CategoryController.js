const Hook = require('../Hook/Hook')
const Category = require('../Model/Category')

const TreeCategory = (category, idCategory) => {
    var out = []
    for (var i in category) {

        if (category[i].rootCategory == idCategory) {

            var children = TreeCategory(category, category[i].idCategory)
            if (children.length) {
                category[i].childCategory = children
            }
            out.push(category[i])
        }
    }
    return out
}
module.exports = {
    getAll:  (req, res)=>{
        Category.get_all().then((value)=>{
            return res.json({menu:TreeCategory(value,null)})
        })
    },
}