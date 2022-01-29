const express = require(`express`);
const UserController = require(`../controllers/UserController.js`);

const app = express();

// get functions
app.get(`/`, UserController.getIndex);

module.exports = app;