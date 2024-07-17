const express = require('express');
const router = express.Router();
const {createPost , getPosts , getPostById , updatePost , deletePost  } = require('../controllers/postController');



router.post('/create', createPost);
router.get('/', getPosts);
router.get('/:id', getPostById);
router.put('/update/:id', updatePost);
router.delete('/delete/:id', deletePost);

module.exports = router;
