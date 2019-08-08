module.exports = {
    getWhoFollowsYou: (req, res) => {
        const db = req.app.get('db');
        const { personWhoIsFollowed } = req.params;
        db.Followers.GetAllFollowers(+personWhoIsFollowed).then(followers => {
            res.status(200).send(followers)
        })
    },
    getWhoYouAreFollowing: (req, res) => {
        const db = req.app.get('db');
        const { personWhoFollows } = req.params;
        db.Followers.GetAllFollowing(+personWhoFollows).then(following => {
            res.status(200).send(following)
        })
    },
    createFollowRequest: (req, res) => {
        const db = req.app.get('db');
        const {personWhoFollows, personWhoIsFollowed} = req.body;
        db.Followers.RequestToFollow(personWhoFollows, personWhoIsFollowed).then(() => {
            res.status(200).send({message: `Request to follow successfully sent`})
        })
    },
    acceptFollowRequest: (req, res) => {
        const db = req.app.get('db');
        const {personWhoFollows, personWhoIsFollowed} = req.body;
        db.Followers.AcceptFollow([personWhoIsFollowed, personWhoFollows]).then(() => {
            res.status(200).send({message: `Follow Request accepted`})
        })
    }
}