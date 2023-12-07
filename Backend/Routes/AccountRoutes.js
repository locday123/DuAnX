const express = require('express')
const router = express.Router()
const AccountController = require('../Controller/AccountController')
const Hook = require('../Hook/Hook')

router.get("/", Hook.checkLogin, AccountController.getAll)
router.get("/:id", Hook.checkLogin, AccountController.getAccountID)
router.post("/",Hook.checkLogin, AccountController.addAccount)
router.put("/:id",Hook.checkLogin, AccountController.updateAccount)
router.delete("/:id",Hook.checkLogin, AccountController.deleteAccount)

module.exports = router;