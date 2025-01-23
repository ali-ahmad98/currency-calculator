const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { FIXER_API_URL, FIXER_API_KEY } = process.env;

const CoversionLogsFileName = "conversion_logs.json";

// Making axios api instance with fixer config
const fixerApiInstance = axios.create({
  baseURL: FIXER_API_URL,
  headers: {
    apikey: FIXER_API_KEY,
  },
});

//------------- getCurrencySymbols -------------//
exports.getCurrencySymbols = async () => {
  try {
    const response = await fixerApiInstance.get(`/symbols`);
    console.log("response = ", response);
    return response.data;
  } catch (error) {
    console.log("error = ", error);
    throw error;
  }
};

//------------- getConvertionHistory -------------//
exports.getConvertionHistory = async () => {
  const logFilePath = path.join(__dirname, CoversionLogsFileName);

  if (!fs.existsSync(logFilePath)) {
    return { history: [] };
  }

  try {
    const fileData = fs.readFileSync(logFilePath, "utf8");
    const history = fileData ? JSON.parse(fileData) : [];
    return { history };
  } catch (error) {
    throw error;
  }
};

//------------- convertCurrency -------------//
exports.convertCurrency = async (body) => {
  const { from, to, amount } = body;
  try {
    const url = `/convert?from=${from}&to=${to}&amount=${amount}`;
    const response = await fixerApiInstance.get(url);
    const data = response.data;
    if (data.success) {
      // Create the log entry
      const logEntry = {
        date: data.date,
        from: data.query.from,
        to: data.query.to,
        amount: data.query.amount,
        convertedAmount: data.result,
        exchangeRate: data.info.rate,
      };

      const logFilePath = path.join(__dirname, CoversionLogsFileName);

      // Read the current log file or initialize as an empty array
      let logs = [];
      if (fs.existsSync(logFilePath)) {
        const fileData = fs.readFileSync(logFilePath, "utf8");
        logs = fileData ? JSON.parse(fileData) : [];
      }

      // Append the new log entry to the array
      logs.push(logEntry);

      // Write the updated logs back to the file
      fs.writeFileSync(logFilePath, JSON.stringify(logs, null, 2));
    }
    return data;
  } catch (error) {
    throw error;
  }
};
