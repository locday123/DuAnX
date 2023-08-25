const express = require('express')
const router = express.Router()
const AccountController = require('../Controller/AccountController')
const Hook = require('../Hook/Hook')
const Upload = require('../Hook/Upload')

router.get("/", Hook.checkLogin, AccountController.index)
router.post("/",AccountController.uploadFile)
router.put("/:id", AccountController.updateAccount)
router.delete("/:id", AccountController.deleteAccount)

module.exports = router;