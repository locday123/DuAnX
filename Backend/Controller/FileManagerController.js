const dree = require('dree')

const treeFolder = dree.scan('public')
module.exports = {
    getAll: (req, res) => {
        var data = req.body.path ? req.body.path : ""
        return res.json([treeFolder]) 
    }
}