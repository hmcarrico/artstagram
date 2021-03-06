module.exports = {
    getCommentsForPost: (req, res) => {
        const db = req.app.get('db');
        const { postId } = req.params;
        db.Posts.Comments.GetCommentsForPost(postId).then(comments => {
            res.status(200).send(comments)
        })
    },
    postComment: (req, res) => {
        const db = req.app.get('db');
        const { postId, userId, comment } = req.body;
        console.log('postId, userId, comment -->', postId, userId, comment)
        db.Posts.Comments.PostComment([postId, userId, comment]).then(comments => {
            res.status(200).send(comments)
        })
    }
}