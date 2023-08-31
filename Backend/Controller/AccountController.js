const multer = require("multer");
const Upload = require("../Hook/Upload");
const Account = require("../Model/Account");
module.exports = {
    getAll:  (req, res)=>{
        Account.get_all().then((value)=>{
            return res.json(value)
        }) 
    },
    getAccountID:(req, res)=>{
        Account.find(req.params.id).then((value)=>{
            return res.json({getStatus: "SUCCESS", info:value})
        })
    },

    addAccount: (req, res)=>{
            var data = {
                nameAccount: req.body.nameAccount == 'undefined'? null:req.body.nameAccount,
                passAccount: req.body.passAccount == 'undefined'? null:req.body.passAccount,
                sexAccount: req.body.sexAccount == 'undefined'? null:req.body.sexAccount,
                phoneAccount: req.body.phoneAccount == 'undefined'? null:req.body.phoneAccount,
                dateAccount: req.body.dateAccount == 'undefined'? null:req.body.dateAccount,
                emailAccount: req.body.emailAccount == 'undefined'? null:req.body.emailAccount,
            }
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
        var data = {
            nameAccount: req.body.nameAccount,
            passAccount: req.body.passAccount,
            sexAccount: Number.parseInt(req.body.sexAccount),
            dateAccount: req.body.dateAccount,
            phoneAccount: req.body.phoneAccount,
            emailAccount: req.body.emailAccount
        }
        if(data){
            Account.update(req.params.id, data).then(()=>{
                res.json({
                    status: 'SUCCESS',
                    message:'Cập nhật thành công ID ' + req.params.id
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