import React, {useState, useEffect} from "react";
import "./ExchangeRates.css";
import ExchangeApi from "../../utils/ExchangeApi";

const ALLOWED_CURRENCIES = ["usd", "eur", "eth", "btc", "brl"];

function ExchangeRates() {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [availableCurrencies, setAvailableCurrencies] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState("usd");
  const [loading, setLoading] = useState(true);
  const [ratesLoading, setRatesLoading] = useState(false);

  const normalizeRates = (data, currency, currenciesMap) => {
    const ratesObject = data?.[currency] ?? data;
    if (Array.isArray(ratesObject)) {
      return ratesObject;
    }
    return Object.entries(ratesObject || {})
      .filter(([rateCurrency]) => ALLOWED_CURRENCIES.includes(rateCurrency.toLowerCase()))
      .map(([rateCurrency, rate]) => ({
        currency: rateCurrency,
        name: currenciesMap?.[rateCurrency] || rateCurrency,
        rate,
      }));
  };

  useEffect(() => {
    const fetchAvailableCurrencies = async () => {
      try {
        const currencies = await ExchangeApi.getAvailableCurrencies();
        setAvailableCurrencies(currencies);
      } catch (error) {
        console.error("Error fetching available currencies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableCurrencies();
  }, []);

  useEffect(() => {
    const fetchRates = async () => {
      setRatesLoading(true);
      try {
        const data = await ExchangeApi.getCurrencyRates(selectedCurrency);
        setExchangeRates(normalizeRates(data, selectedCurrency, availableCurrencies));
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      } finally {
        setRatesLoading(false);
      }
    };

    fetchRates();
  }, [selectedCurrency, availableCurrencies]);

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  if (loading) {
    return <div className="exchange-rates">Carregando...</div>;
  }

  return (
    <div className="exchange-rates">
      <h2>Taxas de Câmbio</h2>
      <label htmlFor="base-currency">
        Moeda base:
        <select
        className="exchange-rates__select"
          id="base-currency"
          value={selectedCurrency}
          onChange={handleCurrencyChange}
        >
          {Object.entries(availableCurrencies)
            .filter(([code]) => ALLOWED_CURRENCIES.includes(code.toLowerCase()))
            .map(([code, name]) => (
              <option key={code} value={code}>
                {code.toUpperCase()} - {name}
              </option>
            ))}
        </select>
      </label>

      {ratesLoading ? (
        <div>Carregando taxas para {selectedCurrency.toUpperCase()}...</div>
      ) : (
        <ul className="exchange-rates__list">
          {exchangeRates
            .sort((a, b) => {
              const isCryptoA = ["eth", "btc"].includes(a.currency.toLowerCase());
              const isCryptoB = ["eth", "btc"].includes(b.currency.toLowerCase());
              return isCryptoA - isCryptoB;
            })
            .map((rate) => {
              const formattedRate = Number(rate.rate).toFixed(2);
              return (
                <li key={rate.currency}>
                  {rate.currency.toUpperCase()} ({rate.name}): {formattedRate}
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
}

export default ExchangeRates;