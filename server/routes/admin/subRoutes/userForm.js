var express = require('express');
const { userFormAdmin } = require('../../../controllers/admin/userForm');
var router = express.Router();

router.get('/', userFormAdmin)
// router.post('/verify-otp', apiVerifyOTPValidator, verifyOTPUserAPI)
// router.get('/', authentication, fetchUserAPI)
// router.get('/logout', authentication, logoutUserAPI)



module.exports = router;
