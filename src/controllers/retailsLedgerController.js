const retailsLedgerModal = require('../models/retailsLedgerModal');

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

const updateRetailsAccount= async(req,res)=>{

}

module.exports ={
    addRetailsAccount,
    updateRetailsAccount
}