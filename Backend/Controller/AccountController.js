const multer = require("multer");
const Upload = require("../Hook/Upload");
const Account = require("../Model/Account");
const upload_images = Upload.uploadAvatar.single("imagesAccount")
module.exports = {
    getAll:  (req, res)=>{
        Account.get_all().then((value)=>{
            return res.json(value)
        }) 
    },
    getAccountID:(req, res)=>{
        Account.find(req.params.id).then((value)=>{
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
            Account.create(data).then((value)=>{
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
            
            console.log(typeof JSON.parse(JSON.stringify(req.body.data)))
        })  
        
    },

    deleteAccount: (req, res)=>{
        Account.delete(req.params.id).then((value)=>{
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