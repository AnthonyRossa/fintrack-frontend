class ExchangeApi {
  constructor() {
    this.baseUrl = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies';
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Erro: ${res.status}`);
  }

  _handleError(err) {
    console.error('API Error:', err);
    throw err;
  }

  getCurrencyRates(currency = "usd") {
    const normalizedCurrency = String(currency).toLowerCase();
    return fetch(`${this.baseUrl}/${normalizedCurrency}.json`, { cache: "no-store" })
      .then(this._checkResponse)
      .catch(err => {
        this._handleError(err);
      });
  }

  getAvailableCurrencies() {
    return fetch(`${this.baseUrl}.json`, { cache: "no-store" })
      .then(this._checkResponse)
      .catch(err => {
        this._handleError(err);
      });
  }
}

export default new ExchangeApi();