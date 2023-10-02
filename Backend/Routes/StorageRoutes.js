const express = require('express')
const router = express.Router()
const StorageController = require('../Controller/StorageController')
const Hook = require('../Hook/Hook')

router.get("/", Hook.checkLogin, StorageController.getAll)
router.post("/", StorageController.addStorage)
router.delete("/:id", StorageController.deleteStorage)

module.exports = router;