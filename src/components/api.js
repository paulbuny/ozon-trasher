// Api-шка
export default class Api {
  constructor (url, ClientId, apiKey) {
    this._url = url,
    this._clientId = ClientId,
    this._apiKey = apiKey
  }

  _getResponseStatus (res) {
    if (res.ok) {
       return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
}

  async sendToArchive (productId) {
    return await fetch(`${this._url}/v1/product/archive`, {
      method: 'POST',
      headers: {
        'Client-Id': this._clientId,
        'Api-Key': this._apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'product_id': productId
      })
    })
    .then((res) => {
      return this._getResponseStatus(res);
    });
  }

  async removeFromArchive (productId) {
    return await fetch(`${this._url}/v1/product/unarchive`, {
      method: 'POST',
      headers: {
        'Client-Id': this._clientId,
        'Api-Key': this._apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'product_id': productId
      })
    })
        .then((res) => {
          return this._getResponseStatus(res);
        });
  }
}
