const { text } = require("express");
const mongoose = require("mongoose");

const retailLedgerModel = mongoose.Schema({
    shop_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'register_shops'
    },
    customer_name:{
        type : String,
        //required : [true, 'Customer name is required']
    },
    phone:{
        type : Number,
        //required : [true, 'Phone no is required']
    },    
    account_type:{
        type : String,
        default : 'retail'
    },
    address:{
        type : String
    }
});

const retailAccountSchema = mongoose.model('retail_account', retailLedgerModel);

module.exports =retailAccountSchema
