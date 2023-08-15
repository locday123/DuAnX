const express = require('express')
const router = express.Router()

router.get("/", (req, res)=>{
    res.clearCookie('vq')
    return res.json({status:'LOGOUT'})
});


module.exports = router;