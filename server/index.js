const express = require('express');
const massive = require('massive');
const session = require('express-session');
require("dotenv").config();

const app = express();
const { CONNECTION_STRING, SESSION_SECRET, SERVER_PORT } = process.env;

// Routes Files
const auth = require("./routes/authRoutes");
const users = require("./routes/userRoutes");
const posts = require("./routes/postRoutes");
const comments = require("./routes/commentRoutes");
const follows = require("./routes/followRoutes");

app.use(express.json());
app.use(
    session({
        resave: true,
        saveUninitialized: false,
        secret: SESSION_SECRET,
        cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 //7 days
        } 
    })
);

massive(CONNECTION_STRING).then(db => {
    app.set("db", db);
    console.log(`Connection is secure, you can now use the db`);
})
    .catch(err => {
    console.log("you have an err connecting to your database", err);
});

// use router files for endpoints
app.use("/auth", auth);
app.use("/users", users);
app.use("/posts", posts);
app.use("/comments", comments);
app.use("/follows", follows);

const PORT = SERVER_PORT || 6000;
app.listen(PORT, () => console.log(`hey hey, you're on port ${PORT}`));