const express = require('express')
const router = express.Router()
const Hook = require('../Hook/Hook');
const ProductController = require('../Controller/ProductController');

router.get("/", Hook.checkLogin, ProductController.detailsProduct)
router.post("/", Hook.checkLogin,ProductController.addProduct)
router.put("/:id", Hook.checkLogin, ProductController.updateProduct)
router.delete("/:id", Hook.checkLogin,ProductController.deleteProduct)

module.exports = router;