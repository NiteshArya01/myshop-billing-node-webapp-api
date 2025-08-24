const express = require("express");

const router = express.Router();

const auth = require('../middlewares/authMiddleware');

// Purchase ledger controller
const purchaseLedgerContrrolr = require("../controllers/purchaseLedgerController");

// Salses ledger controller
const salesLedgerController = require("../controllers/salesLedgerController");


// Purchase account routes
router.post('/ledger-purchase/add',auth,purchaseLedgerContrrolr.addPurchaseAccount);
router.post('/ledger-purchase/update',auth,purchaseLedgerContrrolr.updatePurchaseAccount);


// Sales account routes
router.post('/ledger-sales/add',auth,salesLedgerController.addSalesAccount);
router.post('/ledger-sales/update',auth,salesLedgerController.updateSalesAccount);


module.exports = router;