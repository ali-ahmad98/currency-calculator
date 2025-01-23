import { useEffect, useState } from "react";
import apiInstance from "../../api/apiInstance";

const CurrencyConversionHistory = () => {
  const [conversionHistory, setConversionHistory] = useState([]);

  useEffect(() => {
    const getCurrencySymbols = async () => {
      const response = await apiInstance.get("/currency/history");
      setConversionHistory(response.data?.history || []);
    };
    getCurrencySymbols();
  }, []);

  return (
    <div>
      <h1 className="text-[25px] font-bold text-blue-500">Convertersion History</h1>

      <table className="mt-5 w-full border-collapse border border-blue-500 max-w-xl mx-auto">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="py-2 px-2 text-left">Date</th>
            <th className="py-2 px-2 text-left">From</th>
            <th className="py-2 px-2 text-left">To</th>
            <th className="py-2 px-2 text-left">Amount</th>
            <th className="py-2 px-2 text-left">Converted Amount</th>
            <th className="py-2 px-2 text-left">Exc Rate</th>
          </tr>
        </thead>
        <tbody>
          {conversionHistory.map((record, index) => (
            <tr key={index} className="bg-white border-b border-blue-500">
              <td className="py-2 px-2">{record.date}</td>
              <td className="py-2 px-2">{record.from}</td>
              <td className="py-2 px-2">{record.to}</td>
              <td className="py-2 px-2">{record.amount}</td>
              <td className="py-2 px-2">{record.convertedAmount}</td>
              <td className="py-2 px-2">{record.exchangeRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CurrencyConversionHistory;
