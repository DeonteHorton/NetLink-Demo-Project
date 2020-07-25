const express = require('express');
const router = express.Router();

//Chaining the url

//- localhost:3008/api/accounts
router.use('/accounts',require('./api/accountRoutes'));

// -localhost:3008/api/blogs
router.use('/blogs',require('./api/BlogRoutes'))

module.exports = router;