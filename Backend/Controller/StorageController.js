const STORAGE = require("../Model/Storage");


module.exports = {
    getAll:  (req, res)=>{
        STORAGE.get_all().then((value)=>{
            return res.json(value)
        })
    }
}