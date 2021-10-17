const createStore = (reducer, initialState) => {
  // Индекс текущего стейта
  let currentState = 0;
  // Хранилище истории всех стейтов
  const stateHistory = [];
  // Обработчики изменения стейта
  const subscribers = new Map();

  // Устанавливает новый стейт
  const setState = function (state) {
    stateHistory.push(state);
    currentState = stateHistory.length - 1;
    subscribers.forEach((subscriber) => subscriber(state));
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

  // Подписывает subscriber на изменение стейта
  const subscribe = function (subscriber) {
    subscribers.set(subscriber, subscriber);
  };

  // Отписывает subscriber
  const unsubscribe = function (subscriber) {
    subscribers.delete(subscriber);
  };

  dispatch({ type: '__INIT__', payload: initialState });

  return {
    dispatch,
    getState,
    subscribe,
    unsubscribe,
  };
};

export { createStore };
