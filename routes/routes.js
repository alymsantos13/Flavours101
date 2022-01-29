const express = require(`express`);
const UserController = require(`../controllers/UserController.js`);

const app = express();

// get functions
app.get(`/`, UserController.getIndex);
app.get('/:id', UserController.getProfile);

module.exports = app;