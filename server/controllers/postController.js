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
        const { post_id } = req.params;
    },
    createPost: (req, res) => {
        const db = req.app.get('db');
        const {  } = req.body;

    }
}