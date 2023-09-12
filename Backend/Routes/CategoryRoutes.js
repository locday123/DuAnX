const express = require('express')
const router = express.Router()
const CategoryController = require('../Controller/CategoryController')
const Hook = require('../Hook/Hook')

router.get("/", Hook.checkLogin, CategoryController.getAll)
router.post("/", Hook.checkLogin,CategoryController.addCategory)
router.delete("/:id", Hook.checkLogin,CategoryController.deleteCategory)
module.exports = router;