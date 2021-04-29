// базовый url API Ozon
const baseUrl = 'https://api-seller.ozon.ru';

// Импорт данных для подключения
import {abdulaev, cll, decoM, comp, deco, stylishHouse} from './src/utils/constants.js';

// Импорт класса API
import Api from './src/components/api.js'

// Ловим элементы
const form = document.querySelector('.form');
const formInput = form.querySelector('.form__input');
const submitBtn = form.querySelector('.form__button');
const resultContainer = document.querySelector('.results__content');

let productId = [];

// Api ИП Абдулаев
const apiAbdulaev = new Api(baseUrl, abdulaev.clientId, abdulaev.apiKey);

// Api ООО КЛЛ
const apiCll = new Api(baseUrl, cll.clientId, cll.apiKey);

// Api Декотекс - М
const apiDecoM = new Api(baseUrl,decoM.clientId,decoM.apiKey);

// Api ООО Комп
const apiComp = new Api(baseUrl, comp.clientId, comp.apiKey);

// Api Декотекс
const apiDeco = new Api(baseUrl, deco.clientId, deco.apiKey);

// Api ООО Стильный дом
const apiStylishHouse = new Api(baseUrl, stylishHouse.clientId, stylishHouse.apiKey);

function getTemplate () {
  const resultTemplate = document.querySelector('.result-template').content
  .querySelector('.result')
  .cloneNode(true);

  return resultTemplate;
}

function createResultItem(id, status) {
  const result = getTemplate();

  const resultId = result.querySelector('.result__text');
  const resultStatus = result.querySelector('.result__status');

  resultId.textContent = id;

  if (status) {
    resultStatus.classList.add('result__status_ok');
    resultStatus.textContent = 'OK!';
  } else {
    resultStatus.classList.add('result__status_error');
    resultStatus.textContent = 'ERROR!';
  }

  return result;
}

function getInputValue(input) {
  productId = input.value.split(';');
  console.log(productId);
}

function sendToArchive (event) {
  event.preventDefault();
  resultContainer.innerHTML = '';
  getInputValue(formInput);

  productId.forEach((item) => {
    apiDeco.sendToArchive([item])
    .then((res) => {
      resultContainer.prepend(createResultItem(item, res.result));
      console.log(res);
    })
    .catch(() => {
      resultContainer.prepend(createResultItem(item, false));
    })
  });
}


// 71714494;71855762

submitBtn.addEventListener('click', sendToArchive);
