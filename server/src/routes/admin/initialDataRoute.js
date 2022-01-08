const express = require('express');
const router = express.Router();
const { initialData } = require("../../controllers/admin/initialDataController")
router.post('/initdata',initialData)

module.exports = router;