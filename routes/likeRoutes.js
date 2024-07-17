const express = require('express');
const router = express.Router();
const {likePost , unlikePost} = require('../controllers/likeController');


router.post('/like', likePost);
router.post('/unlike', unlikePost);

module.exports = router;
