const retailsLedgerModal = require('../models/retailsLedgerModal');
const mongoose = require("mongoose");
// Add new purchase account
const addRetailsAccount = async(req, res)=>{
    const {customer_name,phone,address} = req.body;
    
    var obj={
        shop_id : req.user.id,
        customer_name : customer_name,
        phone: phone,
        address : address
    }
    
    const data = new retailsLedgerModal(obj);
    data.save().then(result => {
            res.status(200).json({
                success: true,
                msg: "Customer ledger account created successfully.",
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

const retailAccountList = async(req, res)=>{
    try{
        const shopId = req.user.id;
    
        let query = {shop_id:shopId};

        const list = await retailsLedgerModal.find(query);

        res.status(200).json({
            success: true,
                    msg: "Retail ledger accounts retrieved successfully",
                    data: list
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            error: err,
            msg: "Failed to fetch retail accounts. Please try again later."
        });
    }
}

const updateRetailsAccount= async(req,res)=>{
try{
        const { id } = req.params;
        const {customer_name,phone,address} = req.body;
    
        var updateData={
            shop_id : req.user.id,
            customer_name : customer_name,
            phone: phone,
            address : address
        }

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid retail account ID' });
        }
        // Optional: sanitize or validate fields here
        // Example: if phone is present, ensure it's a number
        if (updateData.phone && isNaN(updateData.phone)) {
            return res.status(400).json({ error: 'Phone number must be numeric' });
        }

        const updatedAccount = await retailsLedgerModal.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedAccount) {
            return res.status(404).json({ error: 'Retail account not found' });
        }

        res.status(200).json({
            message: 'Retail account updated successfully',
            data: updatedAccount
        });
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const retailAccountDelete = async (req, res)=>{
    try{
        const account_id = req.params.id;

        const account = await retailsLedgerModal.deleteOne({_id:account_id});

        res.send(200).json({
            success: true,
            msg : "Sales ledger account deleted successfully"
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            error: err,
            msg: "Failed to delete sales accounts. Please try again later."
        })
    }
}

module.exports ={
    addRetailsAccount,
    updateRetailsAccount,
    retailAccountList,
    retailAccountDelete
}