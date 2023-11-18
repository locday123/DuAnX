const dree = require('dree')
const options = {
    stat: false,
    hash: false,
    sizeInBytes: false,
    size: true,
    normalize: true,
};
const treeFolder = dree.scan('public', options)
module.exports = {
    getAll: (req, res) => {
        var data = req.body.path ? req.body.path : ""
        return res.json([treeFolder]) 
    }
}