const salesLedgerModel = require('../models/salesLedgerModal');
const mongoose = require("mongoose");
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
    try{
        const { id } = req.params;
        const {customer_name,contact_person_name,phone,email,GST_number,bank_name,account_number,ifsc_code,account_type,address} = req.body;
    
        var updateData={
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

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid sales account ID' });
        }
        // Optional: sanitize or validate fields here
        // Example: if phone is present, ensure it's a number
        if (updateData.phone && isNaN(updateData.phone)) {
            return res.status(400).json({ error: 'Phone number must be numeric' });
        }

        const updatedAccount = await salesLedgerModel.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedAccount) {
            return res.status(404).json({ error: 'Sales account not found' });
        }

        res.status(200).json({
            message: 'Sales account updated successfully',
            data: updatedAccount
        });
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


const salesAccountList = async(req, res)=>{
    try{
        const shopId = req.user.id;

        let query = { shop_id: shopId};

        const account = await salesLedgerModel.find(query);


        res.status(200).json({
                success: true,
                msg: "Sales ledger accounts retrieved successfully",
                data: account
        });
    }catch(err){
        res.status(500).json({
            success: false,
            error: err,
            msg: "Failed to fetch purchase accounts. Please try again later."
        });
    }
    
}

const salesAccountDelete =async (req, res)=>{
    try{
        const accountId= req.params.id;

        const account = await salesLedgerModel.deleteOne({_id : accountId});

        res.status(200).json({
            success : true,
            msg : "Sales ledger account deleted successfully",
            data : account
        })

    }catch(err){
        res.status(500).json({
            success: false,
            error: err,
            msg: "Failed to delete sales accounts. Please try again later."
        })
    }
}

module.exports ={
    addSalesAccount,
    updateSalesAccount,
    salesAccountList,
    salesAccountDelete
}