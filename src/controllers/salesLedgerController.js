const salesLedgerModel = require('../models/salesLedgerModal');

// Add new purchase account
const addSalesAccount = async(req, res)=>{
    const {customer_name,contact_person_name,phone,email,GST_number,bank_name,account_number,ifsc_code,account_type,address} = req.body;
    
    var obj={
        shop_id : req.user.id,
        customer_name : customer_name,
        contact_person_name : contact_person_name,
        phone: phone,
        email: email,
        GST_number : GST_number,
        bank_name : bank_name,
        account_number : account_number,
        ifsc_code : ifsc_code,
        account_type: account_type,
        address : address
    }
    
    const data = new salesLedgerModel(obj);
    data.save().then(result => {
            res.status(200).json({
                success: true,
                msg: "Sales account created successfully",
                data: result
            })

        }).catch(err => {
            res.status(400).json({
                success: false,
                error: err,
                msg: "Unable to submit your request. We encountered a glitch. Please try again.",
            })
        })
}   

const updateSalesAccount= async(req,res)=>{

}

module.exports ={
    addSalesAccount,
    updateSalesAccount
}