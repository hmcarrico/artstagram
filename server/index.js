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




// ! AWS BUCKET ENDPOINT -----------------------------

const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');

// configure the keys for accessing AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird);

// create S3 instance
const s3 = new AWS.S3();

// abstracts function to upload a file returning a promise
const uploadFile = (buffer, name, type) => {
const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: process.env.S3_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
};
    return s3.upload(params).promise();
};

// Define POST route
app.post('/api/test-upload', (request, response) => {
const form = new multiparty.Form();
    form.parse(request, async (error, fields, files) => {
    if (error) throw new Error(error);
    try {
        const path = files.file[0].path;
        const buffer = fs.readFileSync(path);
        const type = fileType(buffer);
        const timestamp = Date.now().toString();
        const fileName = `bucketFolder/${timestamp}-lg`;
        const data = await uploadFile(buffer, fileName, type);
        return response.status(200).send(data);
    } catch (error) {
        return response.status(400).send(error);
    }
    });
});

// ! ------------------------------------------------------------

const PORT = SERVER_PORT || 6000;
app.listen(PORT, () => console.log(`hey hey, you're on port ${PORT}`));