const { text } = require("express");
const mongoose = require("mongoose");

const salesLedgerModel = mongoose.Schema({
    shop_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'register_shops'
    },
    customer_name:{
        type : String,
        required : [true, 'Customer name is required']
    },
    contact_person_name:{
        type: String,
        required : [true, 'Contact person name is required']
    },
    phone:{
        type : Number,
        required : [true, 'Phone no is required']
    },
    email:{
        type : String
    },
    GST_number:{
        type: String
    },
    bank_name:{
        type : String,
        required :[true, 'Bank name is required']
    },
    account_number:{
        type : Number,
        required : [true, 'Account no is required']
    },
    ifsc_code:{
        type: String,
        required : [true, 'IFSC is required']
    },
    account_type:{
        type : String,
        required : [true, 'Account type is required']
    },
    address:{
        type : String
    }
});

const salesAccountSchema = mongoose.model('sales_account', salesLedgerModel);

module.exports =salesAccountSchema
