const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');
const message_controller = require('../controllers/messageController');

router.get('/sign-up', user_controller.sign_up);

module.exports = router;