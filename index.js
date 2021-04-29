const apiSetting = {
  url: 'https://api-seller.ozon.ru',
  clientId: 53,
  apiKey: '9c961062-d17e-47bd-bd9f-5e9953516073',
}

// Ловим элементы
const form = document.querySelector('.form');
const formInput = form.querySelector('.form__input');
const submitBtn = form.querySelector('.form__button');

let productId = []

// Api-шка
class Api {
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

  sendToArchive (productId) {
    return fetch(`${this._url}/v1/product/archive`, {
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
    })
  }
}

const api = new Api(apiSetting.url, apiSetting.clientId, apiSetting.apiKey);

console.log(form);
console.log(formInput);
console.log(submitBtn);

function getInputValue(input) {
  productId = input.value.split(';');
  console.log(productId);
}

function sendToArchive (event) {
  event.preventDefault();
  getInputValue(formInput);

  api.sendToArchive(productId)
  .then((res) => console.log(res));
}

submitBtn.addEventListener('click', sendToArchive);
