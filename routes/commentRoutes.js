const express = require('express');
const router = express.Router();
const {createComment , deleteComment } = require('../controllers/commentController');


router.post('/add', createComment);
router.delete('/delete', deleteComment);

module.exports = router;

