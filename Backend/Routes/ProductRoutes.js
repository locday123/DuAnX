const express = require('express')
const router = express.Router()
const Hook = require('../Hook/Hook');
const ProductController = require('../Controller/ProductController');

router.get("/", Hook.checkLogin, ProductController.getAll)
module.exports = router;