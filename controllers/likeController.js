const Like = require('../models/likeModel');
const Post = require('../models/postModel');


exports.likePost = async (req, res) => {
    try {
        const { postId, userId } = req.body;
        
        
        const existingLike = await Like.findOne({ post: postId, user: userId });
        if (existingLike) {
            return res.status(400).json({ error: 'Already Liked this post' });
        }

        const like = new Like({ post: postId, user: userId });
        const savedLike = await like.save();

        const updatedpost = await Post.findByIdAndUpdate(postId,{$push: {likes: savedLike._id}} , {new:true}).populate("likes").exec();

        res.status(201).json(
            {
                "Message" : "Like Added",
                post : updatedpost
            }
        );

     
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.unlikePost = async (req, res) => {
    try {
        const { postId, userId } = req.body;

     
        const deletedlike = await Like.findOneAndDelete({ post: postId, user: userId });
        if (!deletedlike) return res.status(404).json({ error: 'Like not found' });


        const updatedpost = await Post.findByIdAndUpdate(postId,{$pull: {likes: deletedlike._id}} , {new:true}).populate("likes").exec();
        

        res.status(200).json({ 
            "message": "unlike Post",
            post : updatedpost

         });
       
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
