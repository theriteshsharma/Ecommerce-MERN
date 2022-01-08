const express = require('express')
const {addtocart, getProduct} = require('../controllers/cartController');
const { requiresignin, userMiddleware } = require('../middleware/common');
const router = express.Router();

router.post('/cart/addtocart',requiresignin, userMiddleware, addtocart);
router.post('/cart/removefromcart',requiresignin, userMiddleware, addtocart);
router.get('/cart',requiresignin, userMiddleware, getProduct);

//router.get('/category/',getCategory)

module.exports = router;