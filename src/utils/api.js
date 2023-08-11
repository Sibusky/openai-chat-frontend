function checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(res.status);
  }
  
  class MessagesApi {
    constructor({ baseUrl, headers }) {
      this._headers = headers;
      this._baseUrl = baseUrl;
    }
  
    getAllMessages() {
      return fetch(`${this._baseUrl}/chat`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          'Content-Type': 'application/json',
        },
      }).then(checkResponse);
    }
  }
  
  export const messagesApi = new MessagesApi({
    baseUrl: 'http://localhost:3001',
    headers: {},
  });
  