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
            console.log(value);
            return res.json({category:TreeCategory(value,null)})
        })
    },
    addCategory: (req, res)=>{
        var data = req.body
        CATEGORY.find(data.linkCategory).then((value)=>{
            if(value == undefined){
                CATEGORY.create(data).then((value)=>{
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
            else{
                res.json({
                    status: 'FAILED',
                    message:'Xảy ra lỗi, vui lòng kiểm tra lại'
                })
            }
        }).catch((err)=>{
            res.json({
                status: 'FAILED',
                message:'Xảy ra lỗi, vui lòng kiểm tra lạia'
            })
        })
        
    },

    updateCategory: (req, res)=>{
        CATEGORY.update(req.params.id, req.body).then(()=>{
            res.json({
                status: 'SUCCESS',
                message:'Cập nhật thành công ID ' + req.params.id
            })
        }).catch((err)=>{
            res.json({
                status: 'FAILED',
                message:'Xảy ra lỗi, vui lòng kiểm tra lạia'
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
                message:'Xảy ra lỗi, vui lòng kiểm tra lại'
            })
        })
    }

}