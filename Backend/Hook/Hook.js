const jwt = require('jsonwebtoken');

module.exports = {
    checkLogin: (req, res, next)=>{
        const token = req.cookies.vq
        if(!token){
            return res.json({thongbao: "Xin hãy đăng nhập"}) 
        }
        else{
            jwt.verify(token, 'vq',(err, decode)=>{
                if(err)
                {
                    return res.json({thongbao: "Đã xảy ra lỗi"})
                }
                else{   
                    req.id = decode.id
                    req.hoten = decode.hoten
                    next();
                }
            });
        }
    }, 
};