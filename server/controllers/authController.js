const bcrypt = require("bcryptjs");

module.exports = {
  signup: async (req, res) => {
        const db = req.app.get("db");

        const { password, confirmPassword, email } = req.body;

        let emailTaken = await db.Account.VerifyEmail([email.toLowerCase()]).catch(
        err => console.log(err)
        );

        //  if emailTaken is empty we send an error message saying that the email is already used (409)
        if (emailTaken.length) {
        return res.sendStatus(409);

        // If confirmPassword does NOT match password we send a passwords don't match error message
        } else if (confirmPassword !== password) {
            res.status(403).json({ message: "passwords do not match" });
        } else {
        // Securely hashes the password before we store it on the database to make it secure
        const hash = await bcrypt.hash(password, 10);
        db.Account.CreateAccount([email.toLowerCase(), hash])

            //set user to session and send info to front end
            .then(response => {
            req.session = response.data;
            res.status(200).json(response);
            })
            .catch(err => err);
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
                userId,
                firstName,
                lastName,
                email,
                isAdmin,
                subscription
            } = results[0];
            req.session.user = {
                user_id,
                first_name,
                last_name,
                bio
            };

            res.status(200).send(req.session.user);
            } else {
            res.status(200).json({ message: "Wrong Password. please try again!" });
            }
        }
    },
}