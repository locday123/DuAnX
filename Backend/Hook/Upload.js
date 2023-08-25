const multer = require("multer")
var storageUser =  multer.diskStorage({
    destination:(req,file,res)=>{
        return res(null, './public/images')
    },
    filename:(req, file, res)=>{
        console.log(file);
        return res(null, file.originalname)
    }
})
module.exports = {
    uploadAvatar: multer({storage: storageUser})
}
