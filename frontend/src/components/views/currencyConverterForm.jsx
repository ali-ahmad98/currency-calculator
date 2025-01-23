import { useEffect, useState } from "react";

import apiInstance from "../../api/apiInstance";
import { toast } from "react-toastify";

const CurrencyConverterForm = () => {
  const [currencySymbols, setCurrencySymbols] = useState([]);
  const [conversionResult, setConversionResult] = useState({});
  const [isLoadingSymbols, setIsLoadingSymbols] = useState(true);

  useEffect(() => {
    const getCurrencySymbols = async () => {
      const response = await apiInstance.get("/currency/symbols");
      setCurrencySymbols(Object.keys(response.data?.symbols || []));
      setIsLoadingSymbols(false);
    };
    getCurrencySymbols();
  }, []);

  const onSubmitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const { from, to, amount } = data;

    if (!from || !to || !amount || isNaN(amount)) {
      toast.error("Please input all the fields with valid data!");
      return;
    }

    try {
      // Send POST request to the backend using Axios
      const response = await apiInstance.post("/currency/convert", data);
      setConversionResult(response.data);
    } catch (error) {
      toast.error("Conversion failed. Please try again later.");
    }
  };

  return (
    <div>
      <h1 className="text-[25px] font-bold text-blue-500">Currency Converter</h1>

      {isLoadingSymbols && <p>Fetching Currency Symbols...</p>}

      <form className="mt-5" onSubmit={onSubmitForm}>
        <label>From:</label>
        <select name="from" required>
          {currencySymbols.map((symbol, index) => (
            <option key={index}>{symbol}</option>
          ))}
        </select>

        <label className="mx-3">To:</label>
        <select name="to" required>
          {currencySymbols.map((symbol, index) => (
            <option key={index}>{symbol}</option>
          ))}
        </select>

        <label className="mx-3">Amount:</label>
        <input name="amount" type="number" placeholder="Amount" required className="w-[100px]" />

        <button type="submit" className="ml-3 px-3 py-2 bg-gray-300 rounded-md">
          Convert
        </button>
      </form>

      <div className="mt-5 p-3 border border-gray-400 rounded-md">
        <p>Result:</p>
        <p>
          <strong>Exchange Rate:</strong> {conversionResult?.info?.rate}
        </p>
        <p>
          <strong>Converted Amount:</strong> {conversionResult.result}
        </p>
      </div>
    </div>
  );
};

export default CurrencyConverterForm;
