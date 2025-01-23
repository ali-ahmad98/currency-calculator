const express = require("express");
const router = express.Router();

const CurrencyController = require("../controllers/CurrencyController");

// currency routes
router.get("/symbols", CurrencyController.getCurrencySymbols);
router.get("/history", CurrencyController.getConvertionHistory);
router.post("/convert", CurrencyController.convertCurrency);

module.exports = router;
