import { BASE_URL } from "./url";
import { getToken } from "./token";

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Error: ${res.status}`);
  }

  _makeRequest(endpoint, options = {}) {
    const token = getToken();
    if (!token) {
      return Promise.reject("No token found");
    }
    return fetch(`${this._baseUrl}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      ...options,
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return this._makeRequest("/users/me");
  }

  setUserInfo(userData) {
    return this._makeRequest("/users/me", {
      method: "PATCH",
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
    });
  }

  getEntries() {
    return this._makeRequest("/entries");
  }

  createEntry(entryData) {
    return this._makeRequest("/entries", {
      method: "POST",
      body: JSON.stringify(entryData),
    });
  }

  deleteEntry(id) {
    return this._makeRequest(`/entries/${id}`, {
      method: "DELETE",
    });
  }

  getExpenses() {
    return this._makeRequest("/expenses");
  }

  createExpense(expenseData) {
    return this._makeRequest("/expenses", {
      method: "POST",
      body: JSON.stringify(expenseData),
    });
  }

  deleteExpense(id) {
    return this._makeRequest(`/expenses/${id}`, {
      method: "DELETE",
    });
  }
}

const api = new Api({
  baseUrl: BASE_URL,
});

export default api;
