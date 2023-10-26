var express = require('express');
const { userFormAPI } = require('../../../controllers/api/userForm');
const { apiUserFormValidator } = require('../../../validators/api/userForm');
var router = express.Router();

router.post('/', apiUserFormValidator, userFormAPI)
// router.post('/verify-otp', apiVerifyOTPValidator, verifyOTPUserAPI)
// router.get('/', authentication, fetchUserAPI)
// router.get('/logout', authentication, logoutUserAPI)



module.exports = router;
