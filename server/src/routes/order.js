const express = require('express')
const {addtoorder, getOrders} = require('../controllers/orderController');
const { requiresignin, userMiddleware } = require('../middleware/common');
const router = express.Router();

router.post('/order/addtoorder',requiresignin, userMiddleware, addtoorder);
router.get('/order',requiresignin, getOrders);

//router.get('/category/',getCategory)

module.exports = router;