const express = require(`express`);
const UserController = require(`../controllers/UserController.js`);

const app = express();

// get functions
app.get(`/`, UserController.getIndex);
app.get('/profile', UserController.getProfile);
app.post('/signin', UserController.postLogin);

module.exports = app;