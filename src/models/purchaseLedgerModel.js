const { text } = require("express");
const mongoose = require("mongoose");

const purchaseLedgerModel = mongoose.Schema({
    shop_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'register_shops'
    },
    company_name:{
        type : String,
        required : [true, 'Company name is required']
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
        type : String
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
        default: "Purchase"
    },
    address:{
        type : String
    }
});

const purchaseAccountSchema = mongoose.model('purchase_account', purchaseLedgerModel);

module.exports =purchaseAccountSchema
