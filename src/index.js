import { createStore } from './redux/createStore';
import { reducer } from './redux/reducer';
import {
  increment,
  decrement,
  toggle_theme,
  log,
} from './redux/actionCreators';

import './styles.css';
import {
  applyMiddleware,
  testMiddleware,
  testMiddleware2,
} from './redux/applyMiddleware';

// DOM элементы
const body = document.querySelector('body');
const counter = document.querySelector('#counter');
const addBtn = document.querySelector('#add');
const subBtn = document.querySelector('#sub');
const asyncBtn = document.querySelector('#async');
const themeBtn = document.querySelector('#theme');

// Начальный стейт
const initialState = { count: 0, isDark: false, log: '' };

// Создаём стор
const store = createStore(
  reducer,
  initialState,
  applyMiddleware(testMiddleware, testMiddleware2)
);

// Рендерит данные на страницу
const render = (state) => {
  counter.textContent = state.count;
  if (state.isDark) {
    body.classList.add('dark');
  } else {
    body.classList.remove('dark');
  }
};

const logger = (state) => {
  console.log(state.log);
};

// Подписываем render на обновление стора
store.subscribe(render);
store.subscribe(logger);

addBtn.addEventListener('click', () => {
  store.dispatch(increment());
});

subBtn.addEventListener('click', () => {
  store.dispatch(decrement());
});

asyncBtn.addEventListener('click', () => {
  setTimeout(() => store.dispatch(increment()), 2000);
});

themeBtn.addEventListener('click', () => {
  store.dispatch(toggle_theme());
});

store.dispatch({ type: '__INIT_APP__' });

fetch('https://yandex.ru/', { mode: 'no-cors' })
  .then((response) => {
    console.log(response);
    response.text();
  })
  .then((data) => {
    store.dispatch(increment());
    store.dispatch(log(data));
  });

setTimeout(() => store.unsubscribe(render), 10000);
