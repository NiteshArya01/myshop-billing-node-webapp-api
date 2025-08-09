const express = require("express");

const router = express.Router();

const purchaseLedgerContrrolr = require("../controllers/purchaseLedgerController");

const auth = require('../middlewares/authMiddleware');

router.post('/ledger-purchase/add',auth,purchaseLedgerContrrolr.addPurchaseAccount);
router.post('/ledger-purchase/update',auth,purchaseLedgerContrrolr.updatePurchaseAccount);

module.exports = router;