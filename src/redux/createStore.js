const createStore = (reducer, initialState, enchancer) => {
  const state = reducer(initialState, '__INIT__');
  // Индекс текущего стейта
  let currentStateIdx = 0;
  // Хранилище истории всех стейтов
  const stateHistory = [state];
  // Обработчики изменения стейта
  const subscribers = [];

  // Устанавливает новый стейт
  const setState = function (state) {
    stateHistory.push(state);
    currentStateIdx = stateHistory.length - 1;
    subscribers.forEach((subscriber) => subscriber(state));
  };

  // Вызывает действие
  const dispatch = function (action) {
    const state = stateHistory[currentStateIdx];
    // Отправляем действие в редюсер и получаем новый стейт
    const newState = reducer(state, action);
    setState(newState);
    return action;
  };

  // Получиает стейт
  const getState = function () {
    return stateHistory[currentStateIdx];
  };

  // Подписывает subscriber на изменение стейта
  const subscribe = function (subscriber) {
    subscribers.push(subscriber);
    return () => {
      delete subscribers[subscribers.indexOf(subscriber)];
    };
  };

  // Вызываем энчансер
  if (enchancer) {
    return enchancer(createStore)(reducer, initialState);
  }

  return {
    dispatch,
    getState,
    subscribe,
  };
};

export { createStore };
