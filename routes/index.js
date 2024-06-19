const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');
const message_controller = require('../controllers/messageController');
const authMiddleware = require('../controllers/authMiddleware');

router.get('/', user_controller.index_get);
router.post('/', message_controller.delete_message)

router.post('/log-in', user_controller.log_in_post);
router.get('/log-out', user_controller.log_out_get);

router.get('/sign-up', user_controller.sign_up_get);
router.post('/sign-up', user_controller.sign_up_post);
router.get('/create-message', authMiddleware.isLoggedIn, message_controller.create_message_get);
router.post('/create-message', authMiddleware.isLoggedIn, message_controller.create_message_post);
router.get('/join-club', authMiddleware.isLoggedIn, user_controller.join_club_get);
router.post('/join-club', authMiddleware.isLoggedIn, user_controller.join_club_post);
router.get('/become-admin', authMiddleware.isLoggedIn, user_controller.become_admin_get);
router.post('/become-admin', authMiddleware.isLoggedIn, user_controller.become_admin_post);


module.exports = router;
