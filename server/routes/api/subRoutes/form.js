var express = require('express');
const { getFormAPI } = require('../../../controllers/api/form');
var router = express.Router();

router.get('/', getFormAPI)

module.exports = router;
