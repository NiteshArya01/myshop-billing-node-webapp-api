const mongoose = require('mongoose');

const shopProfileModel = mongoose.Schema({
    shop_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'register_shops'
    },
    shop_details: {
        GSTIN: {
            type: String,
            required: false
        },
        PAN: {
            type: String,
            required: false
        },
        alternative_phone: {
            type: String,
            required: false
        },
        profile_image: {
            type: String,
            required: false
        },
        shop_images: {
            type: Array,
            required: false
        }
    },
    address_details: {
        address: {
            type: String,
            required: false
        },
        city: {
            type: String,
            required: false
        },
        state: {
            type: String,
            required: false
        },
        country: {
            type: String,
            required: false
        },
        pincode: {
            type: Number,
            required: false
        },
    }

});

const shopProfileSchema = mongoose.model('shop_profile', shopProfileModel);

module.exports = shopProfileSchema;