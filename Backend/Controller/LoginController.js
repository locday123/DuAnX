const Account = require("../model/Account");
const Menu = require('../Model/Menu')
const jwt = require('jsonwebtoken');


const getMenu = (menu, idMenu) =>{
    var out = []
    for (var i in menu) {
      if (menu[i].rootMenu == idMenu) {
        var children = getMenu(menu, menu[i].idMenu)
        if (children.length) {
            menu[i].childMenu = children
        }
        out.push(menu[i])
      }
    }
    return out
}

module.exports = {
    index: (req, res)=>{
        Menu.get_all().then((value)=>{
            return res.json({
                status:"SUCCESS", 
                images:req.images,
                username: req.id, 
                hoten: req.hoten, 
                menu: getMenu(value,null),
            })
        })
    },

    login: (req, res)=>{
        var username = req.body.username
        var password = req.body.password
        let rs = Account.find(username);
        rs.then( function(value){
                if(username == value.idAccount && password == value.passAccount)
                {
                    console.log(value)
                    const id = {id: value.idAccount, hoten: value.nameAccount, images:value.imagesAccount}
                    const token = jwt.sign(id, 'vq', {expiresIn: '1d'});
                    res.cookie('vq',token);
                    return res.json({
                        status: 'SUCCESS',
                        thongbao: "Đăng nhập thành công",
                        token: token
                    })
                }
                else{
                    return res.json({
                        thongbao: "Đăng nhập thất bại",
                        status: 'FALSE'
                    })
                }
        }).catch((err)=>{
            return res.json({
                thongbao: "Đăng nhập thất bại",
                status: 'FALSE'
            })
        })
        .catch(err=>console.log(err))
    }
};