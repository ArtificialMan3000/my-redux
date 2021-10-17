import { createStore } from './redux/createStore';
import { reducer } from './redux/reducer';

import './styles.css';

const body = document.querySelector('body');
const counter = document.querySelector('#counter');
const addBtn = document.querySelector('#add');
const subBtn = document.querySelector('#sub');
const asyncBtn = document.querySelector('#async');
const themeBtn = document.querySelector('#theme');

// Начальный стейт
const initialState = { count: 0 };

const store = createStore(reducer, initialState);

const render = (state) => {
  counter.textContent = state.count;
};

addBtn.addEventListener('click', () => {
  store.dispatch({ type: 'INCREMENT' });
});

subBtn.addEventListener('click', () => {
  store.dispatch({ type: 'DECREMENT' });
});

asyncBtn.addEventListener('click', () => {});

themeBtn.addEventListener('click', () => {});

counter.textContent = store.getState().count;

store.subscribe(render);

setTimeout(() => store.unsubscribe(render), 10000);
