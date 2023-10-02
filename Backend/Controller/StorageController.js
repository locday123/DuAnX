const STORAGE = require("../Model/Storage");


module.exports = {
    getAll:  (req, res)=>{
        STORAGE.get_all().then((value) => {
            value.sort((a, b) => {
                if (a.spaceStorage < b.spaceStorage)
                {
                    return -1
                }
            })
            return res.json(value)
        })
    },
    
    addStorage: (req, res)=>{
        var data = req.body
        STORAGE.find(data.spaceStorage).then((value)=>{
            if(value == undefined){
                STORAGE.create(data).then((value)=>{
                    res.json({
                        status: 'SUCCESS',
                        message:'Tạo dung lượng thành công'    
                    })
                }).catch((err)=>{
                    res.json({
                        status: 'FAILED',
                        message:'Xảy ra lỗi, vui lòng kiểm tra lại'
                    })
                })
            }else{
                res.json({
                    status: 'FAILED',
                    message:'Xảy ra lỗi, vui lòng kiểm tra lại'
                })
            }
        }).catch((err)=>{
            res.json({
                status: 'FAILED',
                message:'Xảy ra lỗi, vui lòng kiểm tra lại'
            })
        })
    },
    deleteStorage: (req, res) => {
        STORAGE.delete(req.params.id).then((value)=>{
            res.json({
                status: 'SUCCESS',
                message:'Xóa thành công dung lượng [ ' + req.params.id+' ]'
            })
        }).catch((err)=>{
            res.json({
                status: 'FAILED',
                message:'Xảy ra lỗi, vui lòng kiểm tra lại'
            })
        })
    }
}