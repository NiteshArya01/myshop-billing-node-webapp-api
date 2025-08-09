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
        require : true
    },
    contact_person_name:{
        type: String,
        require : true
    },
    phone:{
        type : Number,
        require : true
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
        require : true
    },
    ifsc_code:{
        type: String,
        require : true
    },
    account_type:{
        type : String,
        default: "purchase_account"
    },
});

const purchaseAccountSchema = mongoose.model('purchase_account', purchaseLedgerModel);

module.exports =purchaseAccountSchema
