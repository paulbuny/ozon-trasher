// базовый url API Ozon
const baseUrl = 'https://api-seller.ozon.ru';

// Импорт данных для подключения
import {abdulaev, cll, decoM, comp, deco, stylishHouse} from '../utils/constants.js';

// Импорт класса API
import Api from '../components/api.js'

// Ловим элементы
const form = document.querySelector('.form');
const formInput = form.querySelector('.form__input');
const submitBtn = form.querySelector('.form__button');
const resultContainer = document.querySelector('.results__content');

let productId = [];

const selector = document.querySelector('.select__input');

let currentApi;

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

// Функция переключения текущего api
function selectApi (option) {
  switch (option) {
    case 'apiAbdulaev':
      currentApi = apiAbdulaev;
      console.log(option);
    break;
    case 'apiCll':
      currentApi = apiCll;
      console.log(option);
    break;
    case 'apiDecoM':
      currentApi = apiDecoM;
      console.log(option);
    break;
    case 'apiComp':
      currentApi = apiComp;
      console.log(option);
    break;
    case 'apiDeco':
      currentApi = apiDeco;
      console.log(option);
    break;
    case 'apiStylishHouse':
      currentApi = apiStylishHouse;
      console.log(option);
    break;
  }
}

// Отлов верстки карточки результат
function getTemplate () {
  const resultTemplate = document.querySelector('.result-template').content
  .querySelector('.result')
  .cloneNode(true);

  return resultTemplate;
}

// Создание карточки результата
function createResultItem(id, iteration, status) {
  const result = getTemplate();

  const resultId = result.querySelector('.result__text');
  const resultStatus = result.querySelector('.result__status');

  resultId.textContent = `${iteration} - ${id}`;

  if (status) {
    result.classList.add('result__status_ok');
  } else {
    result.classList.add('result__status_error');
  }

  if (status) {
    resultStatus.classList.add('result__status_ok');
    resultStatus.textContent = 'OK!';
  } else {
    resultStatus.classList.add('result__status_error');
    resultStatus.textContent = 'ERROR!';
  }

  return result;
}

// Получение значения из поля ввода артикулов
function getInputValue(input) {
  productId = input.value.split(' ');
}

// Функция добавления в архив
async function sendToArchive (api, counter, item) {

  await setTimeout(()=> {
    api.sendToArchive([item[counter]])
    .then((res) => {
      resultContainer.prepend(createResultItem(item[counter-1], counter, res.result));
    })
    .catch(() => {
      resultContainer.prepend(createResultItem(item[counter-1], counter, false));
    })


    counter++;
    if (counter < item.length) {
      sendToArchive(api, counter, item);
    }
  }, 250)
}

// Функция удаления из архива
async function removeFromArchive(api, counter, item) {

  await setTimeout(()=> {
    api.removeFromArchive([item[counter]])
    .then((res) => {
      resultContainer.prepend(createResultItem(item[counter-1], counter, res.result));
    })
    .catch(() => {
      resultContainer.prepend(createResultItem(item[counter-1], counter, false));
    })


    counter++;
    if (counter < item.length) {
      removeFromArchive(api, counter, item);
    }
  }, 250)
}

// Хэндлер функции отправки артикулов в архив
function sendToArchiveHandler (event) {
  event.preventDefault();
  resultContainer.innerHTML = '';

  let i = 0;

  selectApi(selector.value);
  getInputValue(formInput);
  sendToArchive(currentApi, i, productId);
}

// 71738410 20683709 20684494

submitBtn.addEventListener('click', sendToArchiveHandler);
