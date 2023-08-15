const express = require('express')
const userRouter = express.Router()

const Hook = require('../Hook/Hook')
const LoginController = require('../Controller/LoginController')


userRouter.get("/", Hook.checkLogin, LoginController.index)
userRouter.post("/", LoginController.login)

module.exports = userRouter;