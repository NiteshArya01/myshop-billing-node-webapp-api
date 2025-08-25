const retailsLedgerModel = require('../models/retailsLedgerModal');

// Add new purchase account
const addRetailAccount = async(req, res)=>{
    const {customer_name,phone,address} = req.body;
    
    var obj={
        shop_id : req.user.id,
        customer_name : customer_name,
        phone: phone,
        address : address
    }
    
    const data = new retailsLedgerModel(obj);
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

const updateRetailAccount= async(req,res)=>{
    console.log(req);
}

module.exports ={
    addRetailAccount,
    updateRetailAccount
}