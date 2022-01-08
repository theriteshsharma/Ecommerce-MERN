const express =  require('express');
const { signup, signin, signout} = require('../../controllers/admin/authController');
const {requiresignin}   = require('../../middleware/common')

const { validateSignupRequest, validateSigninRequest,isRequestValidated } = require('../../validator/validation');
const router = express.Router();

router.post('/admin/signin',validateSigninRequest, isRequestValidated, signin);

router.post('/admin/signup', validateSignupRequest, isRequestValidated, signup);
router.post('/admin/signout', requiresignin , signout);



module.exports = router;