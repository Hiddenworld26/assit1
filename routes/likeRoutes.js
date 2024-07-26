const express = require('express');
const router = express.Router();
const {likePost , unlikePost} = require('../controllers/likeController');

const protect = require('../middleware/authMiddleware')
router.post('/like', protect , likePost);
router.post('/unlike', protect, unlikePost);

module.exports = router;
