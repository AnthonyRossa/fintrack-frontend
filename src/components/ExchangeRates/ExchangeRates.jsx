import React, { useState, useEffect } from "react";
import "./ExchangeRates.css";
import ExchangeApi from "../../utils/ExchangeApi";

const ALLOWED_CURRENCIES = ["usd", "eur", "eth", "btc", "brl"];

const CURRENCY_SYMBOLS = {
  USD: "$",
  EUR: "€",
  BRL: "R$",
  BTC: "₿",
  ETH: "Ξ",
};

function ExchangeRates() {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [availableCurrencies, setAvailableCurrencies] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState("usd");
  const [loading, setLoading] = useState(true);
  const [ratesLoading, setRatesLoading] = useState(false);
  const [exchangeDate, setExchangeDate] = useState("");

  const normalizeRates = (data, currency, currenciesMap) => {
    const ratesObject = data?.[currency] ?? data;
    if (Array.isArray(ratesObject)) {
      return ratesObject;
    }
    return Object.entries(ratesObject || {})
      .filter(([rateCurrency]) =>
        ALLOWED_CURRENCIES.includes(rateCurrency.toLowerCase()),
      )
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
        setExchangeRates(
          normalizeRates(data, selectedCurrency, availableCurrencies),
        );
        setExchangeDate(data?.date || data?.updated || "");
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

  const formatExchangeDate = (dateString) => {
    if (!dateString) return "";
    const parts = String(dateString).split("-");
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return String(dateString);
  };

  if (loading) {
    return <div className="exchange-rates">Carregando...</div>;
  }

  return (
    <div className="exchange-rates">
      <h2 className="exchange-rates__title">Taxas de Câmbio</h2>
      <p className="exchange-rates__description">
        Calculadora de conversão de moedas
      </p>

      <label className="exchange-rates__label" htmlFor="base-currency">
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
      <div className="exchange-rates__currency-selector">
        {ratesLoading ? (
          <div>Carregando taxas para {selectedCurrency.toUpperCase()}...</div>
        ) : (
          <ul className="exchange-rates__list">
            {exchangeRates
              .sort((a, b) => {
                const isCryptoA = ["eth", "btc"].includes(
                  a.currency.toLowerCase(),
                );
                const isCryptoB = ["eth", "btc"].includes(
                  b.currency.toLowerCase(),
                );
                return isCryptoA - isCryptoB;
              })
              .map((rate) => {
                const formattedRate = Number(rate.rate).toLocaleString(
                  "pt-BR",
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 6,
                  },
                );
                const symbol =
                  CURRENCY_SYMBOLS[rate.currency.toUpperCase()] || "";
                return (
                  <li className="exchange-rates__item" key={rate.currency}>
                    {rate.currency.toUpperCase()} ({rate.name}): {formattedRate}{" "}
                    {symbol}
                  </li>
                );
              })}
          </ul>
        )}
      </div>
      {exchangeDate && (
        <p className="exchange-rates__date">
          Taxas válidas em: {formatExchangeDate(exchangeDate)}
        </p>
      )}
    </div>
  );
}

export default ExchangeRates;
