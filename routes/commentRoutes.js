const express = require('express');
const router = express.Router();
const {createComment , deleteComment } = require('../controllers/commentController');

const protect = require('../middleware/authMiddleware')

router.post('/add', protect , createComment);
router.delete('/delete', protect ,  deleteComment);

module.exports = router;

