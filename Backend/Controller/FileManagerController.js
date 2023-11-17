const fs = require('fs')
const dree = require('dree')
const optionScan = {
    
    stat: false,
    normalize: true,
    followLinks: true,
    size: true,
    hash: true,
    exclude: /dir_to_exclude/,
    depth: 5,

    extensions: [ 'txt', 'jpg' ]
}
const treeFolder = dree.scanAsync("public/", optionScan)
module.exports = {
    getAll: (req, res) => {
        var data = req.body.path ? req.body.path : ""
        treeFolder.then((data) => {
            return res.json([data])
        })
    }
}