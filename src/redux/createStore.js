const createStore = (reducer, initialState, enchancers = []) => {
  // Вызываем энчансеры
  if (enchancers.length > 0) {
    let enchancedCreateStore = createStore;
    // Композиция энчансеров
    for (let enchancer of enchancers) {
      enchancedCreateStore = enchancer(enchancedCreateStore);
    }

    // Возвращаем store, модифицированный энчансерами
    return enchancedCreateStore(reducer, initialState);
  }

  // Стейт приложения
  let state = reducer(initialState, '__INIT__');

  // Обработчики изменения стейта
  const subscribers = [];

  // Вызывает действие
  const dispatch = function (action) {
    // Отправляем действие в редюсер и получаем новый стейт
    state = reducer(state, action);

    // Вызываем подписчики
    subscribers.forEach((subscriber) => subscriber(state));

    return action;
  };

  // Получает стейт
  const getState = function () {
    return state;
  };

  // Добавляет подписчика
  const subscribe = function (subscriber) {
    subscribers.push(subscriber);
    return () => {
      subscribers.splice(subscribers.indexOf(subscriber));
    };
  };

  return {
    dispatch,
    getState,
    subscribe,
  };
};

export { createStore };
