const proxy = require('http-proxy-middleware');

module.exports = app => {
    app.use('/api', proxy({target: 'http://localhost:6000'}));
    app.use('/users', proxy({target: 'http://localhost:6000'}));
    app.use('/auth', proxy({target: 'http://localhost:6000'}));
    app.use('/posts', proxy({target: 'http://localhost:6000'}));
    app.use('/comments', proxy({target: 'http://localhost:6000'}));
    app.use('/follow', proxy({target: 'http://localhost:6000'}));
};