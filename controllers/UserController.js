const db = require('../models/db.js')
const User = require('../models/UserModel.js') 
const path = require('path');
const async = require('hbs/lib/async');
const { findByIdAndDelete } = require('../models/UserModel.js');
const { Mongoose } = require('mongoose');

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
    },

    getDeleteProfile: (req, res) => {
        let sess = req.session;
        console.log('hi');
        User.deleteOne({_id: sess.User._id}, function(){
            
        })
        res.redirect('/');
        console.log('DELETED');
    },

 
    getUpdatePassword: async (req,res) => {
        let sess = req.session;

        try {
            const { _id } = req.params;
            const salt = await bcrypt.genSalt(10);

            //if yung password is equal sa tinype niya na old password
            //then, if equal din ung new password sa niretype na new password
            //then, password: newpasword

        } catch (err) {
            console.log(err)
        }
    },

}


module.exports = UserController;
