const multer = require("multer");

const PRODUCT = require("../Model/Product")
const CATEGORY = require("../Model/Category")
const STORAGE = require("../Model/Storage")
const UPLOAD = require("../Hook/Upload");
const uploadProduct = UPLOAD.uploadProduct.single("imageProduct")
module.exports = {
    getAll:  (req, res)=>{
        PRODUCT.get_all().then((value) => {
            return res.json(value)
        })
    },
    detailsProduct: (req, res) => {
        const listProduct = PRODUCT.get_all()
        const listCategory = CATEGORY.get_all()
        const listStorage = STORAGE.get_all()
        Promise.all([listCategory, listProduct, listStorage]).then((value) => {
            res.json(value)
        })
    },
    addProduct: (req, res)=>{
        uploadProduct(req,res,(err)=>{
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
            else {
                PRODUCT.create(data).then((value)=>{
                    res.json({
                        status: 'SUCCESS',
                        message:'Thêm sản phẩm thành công'
                    })        
                }).catch((err)=>{
                    res.json({
                        status: 'FAILED',
                        message:'Xảy ra lỗi, vui lòng kiểm tra lại'
                    })
                })
            }
        })
    },

    updateProduct: (req, res)=>{
        PRODUCT.update(req.params.id, req.body).then(()=>{
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

    
    deleteProduct: (req, res)=>{
        PRODUCT.delete(req.params.id).then((value)=>{
            res.json({
                status: 'SUCCESS',
                message:'Xóa thành công sản phẩm [ ' + req.params.id+' ]'
            })
        }).catch((err)=>{
            res.json({
                status: 'FAILED',
                message:'Xảy ra lỗi, vui lòng kiểm tra lại'
            })
        })
    }
}