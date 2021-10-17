import { reducer } from './reducer';

const createStore = () => {
  // Начальный стейт
  const initialState = { count: 0 };
  // Индекс текущего стейта
  let currentState = 0;
  // Хранилище истории всех стейтов
  const stateHistory = [initialState];
  // Обработчики изменения стейта
  const handlersMap = new Map();

  // Устанавливает новый стейт
  const setState = function (state) {
    stateHistory.push(state);
    currentState++;
    handlersMap.forEach((handler) => handler(state));
  };

  // Вызывает действие
  const dispatch = function (action) {
    const state = stateHistory[currentState];
    const newState = reducer(state, action);
    setState(newState);
  };

  // Получиает стейт
  const getState = function () {
    return stateHistory[currentState];
  };

  // Подписывает handler на изменение стейта
  const subscribe = function (handler) {
    handlersMap.set(handler, handler);
  };

  // Отписывает handler
  const unsubscribe = function (handler) {
    handlersMap.delete(handler);
  };

  return {
    dispatch,
    getState,
    subscribe,
    unsubscribe,
  };
};

export { createStore };
