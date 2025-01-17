import { createStore } from './redux/createStore';
import { reducer } from './redux/reducer';
import { increment, decrement, toggle_theme } from './redux/actionCreators';

import './styles.css';
import { applyMiddleware } from './redux/enchancers/applyMiddleware';
import { testMiddleware } from './redux/middlewares/testMiddleware';
import { testMiddleware2 } from './redux/middlewares/testMiddleware2';
import { stateHistory } from './redux/enchancers/stateHistory';

// DOM элементы
const body = document.querySelector('body');
const counter = document.querySelector('#counter');
const addBtn = document.querySelector('#add');
const subBtn = document.querySelector('#sub');
const asyncBtn = document.querySelector('#async');
const themeBtn = document.querySelector('#theme');

// Начальный стейт
const initialState = { count: 0, isDark: false };

// Создаём стор
const store = createStore(reducer, initialState, [
  stateHistory,
  applyMiddleware(testMiddleware, testMiddleware2),
]);

// Рендерит данные на страницу
const render = (state) => {
  // console.log(state.count);
  counter.textContent = state.count;
  if (state.isDark) {
    body.classList.add('dark');
  } else {
    body.classList.remove('dark');
  }
};

// Подписываем render на обновление стора
const unsubscribeRender = store.subscribe(render);

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
