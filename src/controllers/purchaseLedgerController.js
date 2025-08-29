const purchaseLedgerModel = require("../models/purchaseLedgerModel");
const mongoose = require("mongoose");
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
    try {
        const { id } = req.params;
        // const updateData = req.body;

        const {company_name,contact_person_name,phone,email,GST_number,bank_name,account_number,ifsc_code,address} = req.body;
    
    
        var updateData={
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

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid purchase account ID' });
        }

        // Optional: sanitize or validate fields here
        // Example: if phone is present, ensure it's a number
        if (updateData.phone && isNaN(updateData.phone)) {
            return res.status(400).json({ error: 'Phone number must be numeric' });
        }

        const updatedAccount = await purchaseLedgerModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedAccount) {
            return res.status(404).json({ error: 'Purchase account not found' });
        }

        res.status(200).json({
            message: 'Purchase account updated successfully',
            data: updatedAccount
        });
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

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