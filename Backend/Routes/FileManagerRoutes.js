const express = require('express');
const router = express.Router()
const FileManagerController = require('../Controller/FileManagerController');
const Hook = require('../Hook/Hook');


router.post("/", Hook.checkLogin, FileManagerController.getAll)
router.post("/upload/",Hook.checkLogin, FileManagerController.uploadImages)

module.exports = router;