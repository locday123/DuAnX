const fs = require('fs')
module.exports = {
    getAll: (req, res) => {
        var abc = []
        const data = fs.readdirSync("public/").forEach((value,index) => 
            abc.push({title:value, key:index+1  })
        )

        return res.json(abc)
        
    }
}