const multer = require("multer")
const {resolve} = require('path')

var upoadImages =  multer.diskStorage({
    destination: (req, file, res) => {
        var folderRoot = resolve(__dirname, '../public/')
        console.log(req.body.pathFolder);
        return res(null, folderRoot+`/${req.body.pathFolder}`)
    },
    filename:(req, file, res)=>{
        return res(null, file.originalname)
    }
})

var uploadAvatar =  multer.diskStorage({
    destination: (req, file, res) => {
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
    uploadProduct: multer({ storage: uploadProduct }),
    upoadImages: multer({storage: upoadImages})
}
