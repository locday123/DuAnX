const express = require('express')
const router = express.Router()
const AccountController = require('../Controller/AccountController')
const Hook = require('../Hook/Hook')

router.get("/", Hook.checkLogin, AccountController.getAll)
router.get("/:id", Hook.checkLogin, AccountController.getAccountID)
router.post("/",AccountController.addAccount)
router.put("/:id", AccountController.updateAccount)
router.delete("/:id", AccountController.deleteAccount)

module.exports = router;