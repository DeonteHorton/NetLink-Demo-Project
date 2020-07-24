const express = require('express');
const router = express.Router();

//Chaining
// /api/accounts
router.use('/accounts',require('./api/accountRoutes'));
// /api/contacts
router.use('/contacts',require('./api/contactRoutes'));
// /api/messages
router.use('/chat',require('./api/chatRoute'));

module.exports = router;