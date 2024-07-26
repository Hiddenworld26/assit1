const express = require('express');
const router = express.Router();
const {createPost , getPosts , getPostById , updatePost , deletePost  } = require('../controllers/postController');

const protect = require('../middleware/authMiddleware');

router.post('/create', protect , createPost);
router.get('/', protect, getPosts);
router.get('/:id', protect , getPostById);
router.put('/update/:id', protect, updatePost);
router.delete('/delete/:id', protect, deletePost);

module.exports = router;
