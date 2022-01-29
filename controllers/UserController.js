const db = require('../models/db.js')
const User = require('../models/UserModel.js') 

const UserController = {
    getIndex: (req, res) => {
        res.render('index', {});
    },

    getProfile: (req, res) => {
        let sess = req.session;

        User.findOne({id: sess._id}).then(result =>  
        error => {
            console.log(error);
        });

        res.render('profile', {
            username: sess.User.username,
            password: sess.User.password,
            description: sess.User.description
        });
    },
}


module.exports = UserController;
