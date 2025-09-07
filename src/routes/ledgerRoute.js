const express = require("express");

const router = express.Router();

// Auth meddleware
const auth = require('../middlewares/authMiddleware');




// Purchase ledger controller
const purchaseLedgerContrrolr = require("../controllers/purchaseLedgerController");

// Salses ledger controller
const salesLedgerController = require("../controllers/salesLedgerController");

// Retail ledger controller 
const reatilsLedgerController = require("../controllers/retailsLedgerController");




/** ----------------------------Routes------------------------------------- */


// Purchase account routes
router.post('/ledger-purchase/add',auth,purchaseLedgerContrrolr.addPurchaseAccount);
router.post('/ledger-purchase/update',auth,purchaseLedgerContrrolr.updatePurchaseAccount);
router.get('/ledger-purchase/list',auth,purchaseLedgerContrrolr.purchaseAccountList);
router.put('/ledger-purchase/update/:id',auth,purchaseLedgerContrrolr.updatePurchaseAccount);
router.delete('/ledger-purchase/delete/:id',auth,purchaseLedgerContrrolr.purchaseAccountDelete);

// Sales account routes
router.post('/ledger-sales/add',auth,salesLedgerController.addSalesAccount);
router.post('/ledger-sales/update',auth,salesLedgerController.updateSalesAccount);
router.get('/ledger-sales/list',auth,salesLedgerController.salesAccountList);
router.put('/ledger-sales/update/:id',auth,salesLedgerController.updateSalesAccount);
router.delete('/ledger-sales/delete/:id',auth,salesLedgerController.salesAccountDelete);

// // Retail account routes8
router.post('/ledger-retail/add',auth,reatilsLedgerController.addRetailsAccount);
router.post('/ledger-retail/update',auth,reatilsLedgerController.updateRetailsAccount);
router.get('/ledger-retail/list',auth,reatilsLedgerController.retailAccountList);
router.put('/ledger-retail/update/:id',auth,reatilsLedgerController.updateRetailsAccount);
router.delete('/ledger-retail/delete/:id',auth,reatilsLedgerController.retailAccountDelete);

module.exports = router;