const purchaseLedgerModel = require("../models/purchaseLedgerModel");

// Add new purchase account
const addPurchaseAccount = async(req, res)=>{
    const {company_name,contact_person_name,phone,email,GST_number,bank_name,account_number,ifsc_code} = req.body;
    
    var obj={
        shop_id : req.user.id,
        company_name : company_name,
        contact_person_name : contact_person_name,
        phone: phone,
        GST_number : GST_number,
        bank_name : bank_name,
        account_number : account_number,
        ifsc_code : ifsc_code
    }
    
    const data = new purchaseLedgerModel(obj);
    data.save().then(result => {
            res.status(200).json({
                success: true,
                msg: "Ledger account created successfully",
                data: result
            })

        }).catch(err => {
            res.status(400).json({
                success: false,
                msg: "Unable to submit your request. We encountered a glitch. Please try again.",
            })
        })
}   

const updatePurchaseAccount= async(req,res)=>{

}

module.exports ={
    addPurchaseAccount,
    updatePurchaseAccount
}