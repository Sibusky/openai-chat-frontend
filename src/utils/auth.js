function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(res.status);
}

class Auth {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  register(name, password) {
    return fetch(`${this._baseUrl}/`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, password }),
    }).then(checkResponse);
  }

  authorize(name, password) {
    return fetch(`${this._baseUrl}/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, password }),
    }).then(checkResponse);
  }

  getCurrentUser(token) {
    return fetch(`${this._baseUrl}/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(checkResponse);
  }
}

export const auth = new Auth({
  // baseUrl: 'https://openai-chat-backend.onrender.com',
  baseUrl: 'http://localhost:3001',
  headers: {},
});
