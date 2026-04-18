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

  getCurrencyRates(currency = "usd") {
    const normalizedCurrency = String(currency).toLowerCase();
    return fetch(`${this.baseUrl}/${normalizedCurrency}.json`)
      .then(this._checkResponse)
      .catch(err => {
        console.error('API Error:', err);
        throw err;
      });
  }

  getAvailableCurrencies() {
    return fetch(`${this.baseUrl}.json`)
      .then(this._checkResponse)
      .catch(err => {
        console.error('API Error:', err);
        throw err;
      });
  }
}

export default new ExchangeApi();