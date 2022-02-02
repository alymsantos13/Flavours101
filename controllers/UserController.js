const db = require('../models/db.js')
const User = require('../models/UserModel.js') 
const path = require('path')

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

    getUpdateProfile: async (req,res) => {
        //FIX MAY MALI DITOOOOOOOOOOOOOOOOOO
        let sess = req.session;
        const { username, description } = req.body
        

        sess.User.username = username;
        sess.User.description = description;
        
        //upload avatar
        const { avatar: image } = req.files;
        // Change file name to username-avatar.jpg
        const fileName = username + '-avatar.' + image.name.split('.')[1]
        const uploadPath = path.resolve('./public/avatars', fileName);

        await image.mv(uploadPath);

        const user = {
            username: username,
            description: description,
            avatar: fileName,
        }

        sess.User.avatar = fileName;

        try {
            await User.updateOne({_id: sess.User._id}, user);
            console.log('PROFILE EDITED');
            res.redirect ('/profile'); 
        } catch (err) {
            console.log(err)
        }
    }
}


module.exports = UserController;
