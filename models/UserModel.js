var mongoose = require('mongoose');


/**
 * Okami Schema.
 * 
 * The account schema.
 * 
 * @property okamid: unique id of the user.
 * @property name: first name and last name of the user in object form.
 * @property email: the email of the user.
 * @property password: password of the user.
 * @property profile: Profile Schema containing the profile of the user.
 */
var UserSchema = new mongoose.Schema({
    id: {type: String},
    username: {
        type: String, 
        required: true
    },
    password: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;