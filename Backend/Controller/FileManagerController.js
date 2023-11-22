const dree = require('dree')
const path = require('path')
const fs = require('fs');
const { log } = require('console');
const { callbackify } = require('util');
const options = {
    stat: false,
    hash: false,
    sizeInBytes: false,
    size: true,
    normalize: true,
};

function addNewFolder(filePath) {
    var dirname = path.resolve(path.join(filePath));
    if (fs.existsSync(dirname)) {
      return true;
    }
    fs.mkdirSync(filePath, { recursive: true });
}

  
module.exports = {
    getAll: (req, res) => {
        var pathFolder = req.body.pathFolder
        var action = req.body.action
        var nameFolder = req.body.newFolder
        
        if (action == "read") {
            return res.json([dree.scan(pathFolder, options)]) 
        }
        if (action == "create-folder")
        {
            if (addNewFolder('.//' + pathFolder + "//" + nameFolder))
            {
                res.json({status: "Thư mục đã tồn tại"})
            }
            else {
                res.json({status: "Tạo thư mục thành công"})
            }
        }
        if (action == "delete-folder") {
            fs.rm('.//' + pathFolder, { recursive:true }, (err) => { 
                if(err){ 
                    // File deletion failed 
                    res.json({status: "Có lỗi xảy ra !!!"})
                } 
                res.json({status: "Xóa thư mục thành công"})
            }) 
        }
        if (action == "rename-folder") {
            fs.renameSync('./' + pathFolder, './' + nameFolder)
        }
        
    }
}