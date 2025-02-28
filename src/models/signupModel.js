const mongoose = require('mongoose');

const signupModel = mongoose.Schema({
    shop_name: {
        type: String,
        required: [true, "Shop name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Duplicate email found"],
        trim: true,
        validate: {
            validator: function (v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    phone: {
        type: String,
        // unique: true,
        // max: 120
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    user_type: {
        type: String,
        required: true
    },
    is_active: {
        type: Boolean,
        required: true
    }
})

const signupSchema = mongoose.model('register_shops', signupModel);

module.exports = signupSchema;