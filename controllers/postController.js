const Post = require('../models/postModel');


const createPost = async (req, res) => {
    try {
        const { title, body, userId } = req.body;
        const post = new Post({ title, body, user: userId });
        await post.save();
        res.status(201).json({
            "message" : "Creating New Post",
            post
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user likes comments');
        res.status(200).json(
            {
                "message" : "Getting all the posts",
                posts
            }
        );
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('user likes comments');
        if (!post) return res.status(404).json({ error: 'Post not found' });
        res.status(200).json(
            {
                "message" : "Getting a single post",
                post
            }
        );
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const updatePost = async (req, res) => {
    try {
        const { title, body, userId } = req.body;
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { title, body, user: userId },
            { new: true, runValidators: true }
        );
        if (!post) return res.status(404).json({ error: 'Post not found' });
        res.status(200).json(
            {
                "message" : "Updating the posts successfully",
                post
            }
        );
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post not found' });
        res.status(200).json({ message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createPost , getPosts , getPostById , updatePost , deletePost
  };
  