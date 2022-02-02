const db = require('../models/db.js')
const User = require('../models/UserModel.js') 

const UserController = {
    getIndex: (req, res) => {
        res.render('index', {});
    },

    getProfile: (req, res) => {
        let sess = req.session;


        res.render('profile', {
            username: sess.User.username,
            password: sess.User.password,
            description: sess.User.description,
            avatar: sess.User.avatar
        });
    },

    postLogin: (req, res) => {
        const sess = req.session;
        var username = req.body.username;
        var password =  req.body.password;

        User.findOne({username: username, password: password}, (err, result)=> {
            if(err) {//pag nag error sa database(pag nag crash)
                console.log(err);
            }
            else {

                if(result){//pag meron
                    req.session.User = result; //set session to current user
                    res.send(result);
                }
                else{//pag null
                    res.send("Incorrect Credentials");
                }

            }
        });
    },

    getEditProfile: (req, res) => {
        let sess = req.session;

        res.render('edit-profile', {
            username: sess.User.username,
            password: sess.User.password,
            description: sess.User.description,
            avatar: sess.User.avatar
        });
    },

    getUpdateProfile: (req,res) => {
        //FIX MAY MALI DITOOOOOOOOOOOOOOOOOO
        let sess = req.session;
        const { username, description, avatar } = req.body
        

        sess.User.username = username;
        sess.User.description = description;
        sess.User.avatar = avatar;
        sess.save();
        
        const user = {
            username: username,
            description: description,
            avatar: avatar
        }

        console.log("Here");

        User.findOneAndUpdate({_id: sess.User._id}, user, function(err, succ) {
            if(err)
                console.log(err);
            else
                console.log('PROFILE EDITED');
        })
    }
}


module.exports = UserController;
