const dree = require('dree')
const {resolve, dirname} = require('path')
const { rename, rm, existsSync, mkdirSync} = require('fs');
const path = require('path');
const multer = require("multer");
const Upload = require('../Hook/Upload');
const upload_images = Upload.upoadImages.single("uploadImages")
const options = {
    stat: false,
    hash: false,
    sizeInBytes: false,
    size: true,
    normalize: true,
};

function addNewFolder(filePath) {
    var dirname = resolve(__dirname, filePath);
    if (existsSync(dirname)) {
      return true;
    }
    mkdirSync(filePath, { recursive: true });
}

  
module.exports = {
    getAll: (req, res) => {
        var pathFolder = req.body.pathFolder
        var action = req.body.action
        var nameFolder = req.body.newFolder
        var folderRoot = resolve(__dirname, '../public/')
        if (action == "read-folder") {
            return res.json([dree.scan(folderRoot+'/'+pathFolder, options)]) 
        }
        if (action == "create-folder")
        {

            if (addNewFolder(folderRoot+"/"+pathFolder+'/'+nameFolder))
            {
                res.json({status: "Thư mục đã tồn tại"})
            }
            else {
                res.json({status: "Tạo thư mục thành công"})
            }
        }
        if (action == "delete-folder") {
            rm(folderRoot+'/'+pathFolder, { recursive:true }, (err) => { 
                if(err){ 
                    // File deletion failed 
                    res.json({status: "Có lỗi xảy ra !!!"})
                } 
                res.json({status: "Xóa thư mục thành công"})
            }) 
        }
        if (action == "rename-folder") {
            const oldPath = folderRoot + `/${pathFolder}`
            const newPath = dirname(oldPath).split(path.sep).pop() + `/${nameFolder}`
            rename(oldPath, newPath,err => console.log(err))
        }
        
    },
    uploadImages: (req, res)=>{
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
            res.json({up:"Upload thành công"})
        })
        
    },
}   