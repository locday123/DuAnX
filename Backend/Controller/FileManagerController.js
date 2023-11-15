const fs = require('fs')

function listDirectories(pth) {
    const directories = (fs.readdirSync(pth, {withFileTypes: true}))
      .filter(dirent => dirent.isDirectory())
      .map(dir => dir.name);
  
    return directories;
}
  
module.exports = {
    getAll: (req, res) => {
        var data = req.body.path ? req.body.path : ""
        return res.json( listDirectories("public/"+data)) 
    }
}