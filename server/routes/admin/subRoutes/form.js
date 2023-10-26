var express = require('express');
const { formAPI, getFormAPI } = require('../../../controllers/admin/form');
const { apiFormValidator } = require('../../../validators/admin/form');
var router = express.Router();

router.post('/', apiFormValidator, formAPI)
router.get('/', getFormAPI)

module.exports = router;
