const express =  require('express');
const { signup, signin, signout} = require('../controllers/authController');
const {requiresignin}   = require('../middleware/common')

const { validateSignupRequest, validateSigninRequest,isRequestValidated } = require('../validator/validation');
const router = express.Router();

router.post('/signin',validateSigninRequest, isRequestValidated, signin);

router.post('/signup', validateSignupRequest, isRequestValidated, signup);
router.post('/signout', requiresignin , signout);



module.exports = router;