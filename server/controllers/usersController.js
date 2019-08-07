module.exports = {
    getUserProfileData: (req, res) => {
        const db = req.app.get("db");
        const { username } = req.params;
        db.Users.GetOneUserData(username).then(userData => {
            res.status(200).send(userData)
        })
    }
}