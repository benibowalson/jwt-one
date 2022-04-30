const mongoose = require('mongoose');

const my_user_object = {
    name: {
        type: String,
        min: 6,
        max: 255,
        required: true
    },
    email: {
        type: String,
        min: 6,
        max: 255,
        required: true
    },
    password: {
        type: String,
        min: 6,
        max: 1024,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
}

const my_user_schema = mongoose.Schema(my_user_object);
module.exports = mongoose.model('UserModel', my_user_schema);