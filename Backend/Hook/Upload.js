const multer = require("multer")
var uploadAvatar =  multer.diskStorage({
    destination:(req,file,res)=>{
        return res(null, './public/images')
    },
    filename:(req, file, res)=>{
        return res(null, file.originalname)
    }
})

var uploadProduct =  multer.diskStorage({
    destination:(req,file,res)=>{
        return res(null, './public/product')
    },
    filename:(req, file, res)=>{
        return res(null, file.originalname)
    }
})

module.exports = {
    uploadAvatar: multer({ storage: uploadAvatar }),
    uploadProduct: multer({storage: uploadProduct})
}
