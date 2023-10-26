var express = require('express');
var router = express.Router();
const formRoutes = require("./subRoutes/form")
const userFormRoutes = require("./subRoutes/userForm")

// user rest apis
router.use('/form', formRoutes);
router.use('/user-form', userFormRoutes);

module.exports = router;
