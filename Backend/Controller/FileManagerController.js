const fs = require('fs')

function listDirectories(path, parent) {
    const data = []
    const directories = (fs.readdirSync(path, {withFileTypes: true}))
      .filter(dirent => dirent.isDirectory())
        .map(dir => data.push(
            { ["title"]: dir.name, ["nameFolder"]: dir.name, ["parentFolder"]: parent, ["path"]: dir.name+"/", ["key"]:dir.name }
        ));
    return data;
}
  
module.exports = {
    getAll: (req, res) => {
        var data = req.body.path ? req.body.path : ""
        return res.json( listDirectories("public/"+data, data)) 
    }
}