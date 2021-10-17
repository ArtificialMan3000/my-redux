import { createStore } from './createStore';
import './styles.css';

const body = document.querySelector('body');
const counter = document.querySelector('#counter');
const addBtn = document.querySelector('#add');
const subBtn = document.querySelector('#sub');
const asyncBtn = document.querySelector('#async');
const themeBtn = document.querySelector('#theme');

const store = createStore();

const render = (state) => {
  counter.textContent = state.count;
};

const increment = () => {};

const decrement = () => {};

addBtn.addEventListener('click', () => {
  store.dispatch({ type: 'increment' });
});

subBtn.addEventListener('click', () => {
  store.dispatch({ type: 'decrement' });
});

asyncBtn.addEventListener('click', () => {});

themeBtn.addEventListener('click', () => {});

counter.textContent = store.getState().count;

store.subscribe(render);

setTimeout(() => store.unsubscribe(render), 10000);
