const express = require('express');
const { register, login, profile } = require('../controllers/auth');

const authenticateUser = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login/', login);
router.get('/profile', authenticateUser, profile);

module.exports = router;

