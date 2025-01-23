import CurrencyConversionHistory from "../views/currencyConversionHistory";
import CurrencyConverterForm from "../views/currencyConverterForm";

const CurrencyConverter = () => {
  return (
    <div className="min-h-[100vh] p-10 grid grid-cols-1 lg:grid-cols-2 gap-5 bg-white">
      <CurrencyConverterForm />
      <CurrencyConversionHistory />
    </div>
  );
};

export default CurrencyConverter;
