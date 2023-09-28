const multer = require("multer");
const Upload = require("../Hook/Upload");
const ACCOUNT = require("../Model/Account");
const upload_images = Upload.uploadAvatar.single("uploadImages")
module.exports = {
    getAll:  (req, res)=>{
        ACCOUNT.get_all().then((value)=>{
            return res.json(value)
        }) 
    },
    getAccountID:(req, res)=>{
        ACCOUNT.find(req.params.id).then((value)=>{
            if(value){
                return res.json({getStatus: "SUCCESS", info:value})
            }else{
                return res.json({getStatus: "ERROR"})
            }
        }).catch((err)=>{
            console.log(err);
        })
    },

    addAccount: (req, res)=>{
            var data = req.body
            ACCOUNT.create(data).then((value)=>{
                res.json({
                    status: 'SUCCESS',
                    message:'Thêm tài khoản thành công'
                })        
            }).catch((err)=>{
                res.json({
                    status: 'FAILED',
                    message:'Xảy ra lỗi, vui lòng kiểm tra lại'
                })
            })
    },  

    updateAccount: (req, res)=>{
        upload_images(req,res,(err)=>{
            if(err instanceof multer.MulterError){
                res.json({
                    status: 'ERROR',
                    message:"Upload avatar lỗi"
                })
            }
            else if(err){
                res.json({
                    status: 'ERROR',
                    message:"Upload avatar lỗi " + err 
                })
            }
            var data= JSON.parse(JSON.parse(JSON.stringify(req.body.data)))
            if(Object.keys(data).length === 0){
                res.json({
                    status: 'FAILED',
                    message:'Xảy ra lỗi, vui lòng kiểm tra lại'
                })
            }
            else{
                ACCOUNT.update(req.params.id, data).then(()=>{
                    res.json({
                        status: 'SUCCESS',
                        message:'Cập nhật thành công ID ' + req.params.id
                    })
                }).catch((err)=>{
                    res.json({
                        status: 'FAILED',
                        message:'Xảy ra lỗi, vui lòng kiểm tra lạiaa'
                    })
                })
            }
        })
        
    },

    deleteAccount: (req, res)=>{
        ACCOUNT.delete(req.params.id).then((value)=>{
            res.json({
                status: 'SUCCESS',
                message:'Xóa thành công ID ' + req.params.id
            })
        }).catch((err)=>{
            res.json({
                status: 'FAILED',
                message:'Xảy ra lỗi, vui lòng kiểm tra lại'
            })
        })
    }
};