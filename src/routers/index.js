const express = require('express');
const  router = express.Router();
const user = require('./user');
const signup = require('./signup');

router.use('/user', user);
router.use('/signup', signup);

module.exports = router;