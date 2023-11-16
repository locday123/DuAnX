const fs = require('fs')

function listDirectories(path, rootFolder) {
    const data = []
    const directories = (fs.readdirSync(path, {withFileTypes: true}))
      .filter(dirent => dirent.isDirectory())
        .map((dir,index) => data.push(
            {
                "idFolder": dir.name,
                "nameFolder": dir.name,
                "rootFolder": rootFolder,
                "pathFolder": rootFolder+"/"+dir.name+"/"
            }
        ));
    return data;
}
  
module.exports = {
    getAll: (req, res) => {
        var pathFolder = req.body.pathFolder ? req.body.pathFolder : ""
        return res.json( listDirectories("public/"+pathFolder, req.body.idFolder?req.body.idFolder:"")) 
    }
}