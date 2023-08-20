const Account = require("../Model/Account");

module.exports = {
    lastAccount: async ()=>{
        return new Promise(function(myResolve, myReject) {
            
         }); 
    },

    index:  (req, res)=>{
        Account.get_all().then((value)=>{
            console.log();
            return res.json(value)
        }) 
    },
    
    addAccount: (req, res)=>{
        var data = {
            idAccount: req.body.idAccount,
            nameAccount: req.body.nameAccount,
            passAccount: req.body.passAccount,
            sexAccount: req.body.sexAccount,
            phoneAccount: req.body.phoneAccount,
            dateAccount: req.body.dateAccount
        }
        Account.find(data.idAccount).then((values)=>{
            if(!values){
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