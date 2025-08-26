const purchaseLedgerModel = require("../models/purchaseLedgerModel");

// Add new purchase account
const addPurchaseAccount = async(req, res)=>{
    const {company_name,contact_person_name,phone,email,GST_number,bank_name,account_number,ifsc_code,address} = req.body;
    
    var obj={
        shop_id : req.user.id,
        company_name : company_name,
        contact_person_name : contact_person_name,
        phone: phone,
        email: email,
        GST_number : GST_number,
        bank_name : bank_name,
        account_number : account_number,
        ifsc_code : ifsc_code,
        address : address
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
                error: err,
                msg: "Unable to submit your request. We encountered a glitch. Please try again.",
            })
        })
}   

const updatePurchaseAccount= async(req,res)=>{

}

const purchaseAccountList = async(req,res)=>{
    try {
        const shopId = req.user.id;

        // Fetch all purchase accounts for the current shop
        const accounts = await purchaseLedgerModel.find({ shop_id: shopId });

        res.status(200).json({
            success: true,
            msg: "Purchase ledger accounts retrieved successfully",
            data: accounts
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err,
            msg: "Failed to fetch purchase accounts. Please try again later."
        });
    }

}

module.exports ={
    addPurchaseAccount,
    updatePurchaseAccount,
    purchaseAccountList
}