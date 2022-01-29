const db = require('../models/db.js')
const User = require('../models/UserModel.js') 

const UserController = {
    getIndex: (req, res) => {
        res.render('index', {});
    },
}

module.exports = UserController;
