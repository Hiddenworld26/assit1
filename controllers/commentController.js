const Comment = require('../models/commentModel');
const Post = require('../models/postModel');


const createComment = async (req, res) => {
    try {
        const { postId, userId, body } = req.body;
        const comment = new Comment({ post: postId, user: userId, body });
        const savedComment = await comment.save();

        
        
        const updatedpost = await Post.findByIdAndUpdate(postId,{$push: {comments: savedComment._id}} , {new:true}).populate("comments").exec();

        res.status(201).json(
            {
                "Message" : "Comment Added",
                post : updatedpost
            }
        );
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const deleteComment = async (req, res) => {
    try {
        const { commentId, postId } = req.body;

        
        const deletedComment = await Comment.findByIdAndDelete(commentId);
        if (!deletedComment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $pull: { comments: deletedComment._id } },
            { new: true }
        ).populate("comments").exec();

        
        res.status(200).json({
            message: "Comment deleted",
            post: updatedPost
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



module.exports={createComment , deleteComment}