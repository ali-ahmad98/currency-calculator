const CurrencyServices = require("../services/CurrencyServices");

// --------------- CurrencyController ---------------- //

// getCurrencySymbols
exports.getCurrencySymbols = async (_, res) => {
  const data = await CurrencyServices.getCurrencySymbols();
  res.status(200).json(data);
};

// getConvertionHistory
exports.getConvertionHistory = async (_, res) => {
  const data = await CurrencyServices.getConvertionHistory();
  res.status(200).json(data);
};

// convertCurrency
exports.convertCurrency = async (req, res) => {
  // Validate input
  const { from, to, amount } = req.body;
  if (!from || !to || !amount || isNaN(amount)) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  const conversion = await CurrencyServices.convertCurrency(req.body);

  if (conversion.success) res.status(200).json(conversion);
  else res.status(conversion.error.code).json({ error: conversion.error.info });
};
