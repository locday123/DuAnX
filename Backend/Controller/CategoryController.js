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
            category[i].key = category[i].idCategory
            out.push(category[i])
        }
    }
    return out
}
module.exports = {
    getAll:  (req, res)=>{
        Category.get_all().then((value)=>{
            return res.json({category:TreeCategory(value,0)})
        })
    },
    addCategory: (req, res)=>{
        var data = req.body
        Category.create(data).then((value)=>{
            res.json({
                status: 'SUCCESS',
                message:'Tạo danh mục mới thành công'
            })        
        }).catch((err)=>{
            res.json({
                status: 'FAILED',
                message:'Xảy ra lỗi, vui lòng kiểm tra lại'
            })
        })
    }
}