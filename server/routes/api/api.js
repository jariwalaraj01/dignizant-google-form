var express = require('express');
var router = express.Router();
const userFormRoutes = require("./subRoutes/userForm")
const formRoutes = require("./subRoutes/form")

// user rest apis
router.use('/user-form', userFormRoutes);
router.use('/form', formRoutes);

module.exports = router;
