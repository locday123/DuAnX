const CATEGORY = require('../Model/Category')

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
        CATEGORY.get_all().then((value) => {
            return res.json({category:TreeCategory(value,null)})
        })
    },

    getCategoryID: (req, res) => {
        CATEGORY.find(req.params.id).then((value)=>{
            if(value){
                return res.json({getStatus: "SUCCESS", info:value})
            }else{
                return res.json({getStatus: "ERROR"})
            }
        }).catch((err)=>{
            console.log(err);
        })
    },

    addCategory: (req, res)=>{
        var data = req.body
        CATEGORY.create(data).then((value)=>{
            res.json({
                status: 'SUCCESS',
                message:'Tạo thành công danh mục '
            })        
        }).catch((err)=>{
            res.json({
                status: 'FAILED',
                message:'Lỗi không xác định, kiểm tra lại'
            })
        })
    },

    updateCategory: (req, res)=>{
        CATEGORY.update(req.params.id, req.body).then(()=>{
            res.json({
                status: 'SUCCESS',
                message:'Cập nhật thành công danh mục '
            })
        }).catch((err)=>{
            res.json({
                status: 'FAILED',
                message:'Lỗi không xác định, kiểm tra lại'
            })
        })
    },

    deleteCategory: (req, res)=>{
        CATEGORY.delete(req.params.id).then((value)=>{
            res.json({
                status: 'SUCCESS',
                message:'Xóa thành công danh mục [ ' + req.params.id+' ]'
            })
        }).catch((err)=>{
            res.json({
                status: 'FAILED',
                message:'XLỗi không xác định, kiểm tra lại'
            })
        })
    }

}