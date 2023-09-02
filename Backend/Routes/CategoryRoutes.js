const express = require('express')
const router = express.Router()
const CategoryController = require('../Controller/CategoryController')
const Hook = require('../Hook/Hook')

router.get("/", Hook.checkLogin, CategoryController.getAll)

module.exports = router;