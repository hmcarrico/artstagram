module.exports = {
    getUsersPosts: (req, res) => {
        const db = req.app.get('db');
        const { username } = req.params;
        db.Posts.GetPostForUser(username).then(posts => {
            res.status(200).send(posts)
        })
    },
    detailedPost: (req, res) => {
        const db = req.app.get('db');
        const { postId } = req.params;
        db.Posts.GetDetailedPost(postId).then(post => {
            res.status(200).send(post[0])
        })
    },
    createPost: (req, res) => {
        const db = req.app.get('db');
        const { userId, postPhoto, description, genre } = req.body;
        db.Posts.CreatePost([userId, postPhoto, description, genre]).then(posts => {
            res.status(200).send(posts)
        })
    }
}