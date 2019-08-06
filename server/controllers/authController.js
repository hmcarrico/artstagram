const bcrypt = require("bcryptjs");

module.exports = {
    signup: async (req, res) => {
        const db = req.app.get("db");

        const { password, confirmPassword, email, firstName, lastName, username, bio } = req.body;

        let emailTaken = await db.Account.VerifyEmail([email.toLowerCase()])
        .catch(
        err => console.log(err)
        );

        //  if emailTaken is empty we send an error message saying that the email is already used (409)
        if (emailTaken.length) {
        return res.status(200).send({message: 'Email taken, please login or use an new email'});

        // If confirmPassword does NOT match password we send a passwords don't match error message
        } else if (confirmPassword !== password) {
            res.status(200).json({ message: "passwords do not match" });
        } else {
        // Securely hashes the password before we store it on the database to make it secure
        const hash = await bcrypt.hash(password, 10);
        const new_user = await db.Account.CreateAccount([email.toLowerCase(), hash])
        const user = await db.Account.CreateProfile([
            new_user[0].user_id,
            firstName,
            lastName,
            username,
            bio
        ]);
            //set user to session and send info to front end
            req.session.user = user[0];
            res.status(200).json(user[0]);
        }
    },
    login: async (req, res) => {
        const db = req.app.get("db");
        const { email, password } = req.body;

        const results = await db.Account.Login([email.toLowerCase()]);
        if (!results[0]) {
            res.status(200).json({ message: "information not found, try again" });
        } else {
            let auth = await bcrypt.compare(password, results[0].password);

            if (auth) {
            const {
                user_id,
                first_name,
                last_name,
                username,
                bio
            } = results[0];
            req.session.user = {
                user_id,
                first_name,
                last_name,
                username,
                bio
            };
            res.status(200).send(req.session.user);
            } else {
            res.status(200).json({ message: "Wrong Password. please try again!" });
            }
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.status(200).send({message: "successful logout"});
    },
    getSession: (req, res) => {
        res.status(200).send(req.session.user);
    },
    checkAvailableUsernames: async(req, res) => {
        const db = req.app.get('db');
        const { username } = req.params;
        const unique = await db.Account.VerifyUsername(username)
        if(!unique.length){
            res.status(200).send({message: "available"})
        } else {
            res.status(200).send({message: "username taken"})
        }
    }
}