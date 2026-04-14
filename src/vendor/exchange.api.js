class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
    }
}

const exchangeApi = new Api ({
    baseUrl: 'https://latest.currency-api.pages.dev/v1/currencies/',
});

export default exchangeApi;