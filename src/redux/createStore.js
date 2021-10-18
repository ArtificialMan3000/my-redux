import { middlewares } from './applyMiddleware';

const createStore = (reducer, initialState, middlewares) => {
  const state = reducer(initialState, '__INIT__');
  // Индекс текущего стейта
  let currentStateIdx = 0;
  // Хранилище истории всех стейтов
  const stateHistory = [state];
  // Обработчики изменения стейта
  const subscribers = new Map();
  // Функции вызова миддлвар для получения диспатчей
  let middlewaresCallers = [];
  // Диспатчи миддлвар
  let middlewaresDispatches = [];
  // Были ли вызваны миддлвары
  let isMiddlewaresCalled = false;

  // Устанавливает новый стейт
  const setState = function (state) {
    stateHistory.push(state);
    currentStateIdx = stateHistory.length - 1;
    subscribers.forEach((subscriber) => subscriber(state));
  };

  // Вызывает действие
  const dispatch = function (action) {
    const state = stateHistory[currentStateIdx];
    let newState;
    if (!isMiddlewaresCalled && middlewaresDispatches[0]) {
      // Передаём управление миддлварам, если они есть и ещё не вызывались
      isMiddlewaresCalled = true;
      middlewaresDispatches[0](action);
    } else {
      // Отправляем действие в редюсер и получаем новый стейт
      newState = reducer(state, action);
      setState(newState);
      isMiddlewaresCalled = false;
    }
  };

  // Получиает стейт
  const getState = function () {
    return stateHistory[currentStateIdx];
  };

  // Подписывает subscriber на изменение стейта
  const subscribe = function (subscriber) {
    subscribers.set(subscriber, subscriber);
  };

  // Отписывает subscriber
  const unsubscribe = function (subscriber) {
    subscribers.delete(subscriber);
  };

  // Вызывает энчансеры
  // const applyStoreEnchancers = function (createStore)

  // Получает функции для вызова диспатчей миддлвар
  const getMiddlewaresCallers = function () {
    middlewaresCallers = middlewares.map((middleware) =>
      middleware({ dispatch, getState })
    );
  };

  // Передаёт миддлварам функции для вызова следующих миддлвар в цепочке
  const provideCallersToMiddlewares = (fromIdx) => {
    const nextCallerIdx = fromIdx + 1;
    let middlewareDispatch;
    if (nextCallerIdx === middlewaresCallers.length) {
      middlewareDispatch = middlewaresCallers[fromIdx](dispatch);
      middlewaresDispatches.unshift(middlewareDispatch);
    } else {
      middlewareDispatch = middlewaresCallers[fromIdx](
        provideCallersToMiddlewares(nextCallerIdx)
      );
      middlewaresDispatches.unshift(middlewareDispatch);
    }
    // console.log('middlewareDispatch', middlewareDispatch);
    return middlewareDispatch;

    // middlewaresCallers.forEach((caller, idx) => {
    //   let dispatchForMiddleware;
    //   if (nextCallerIdx === middlewaresCallers.length) {
    //     // Последняя мидлвара получает настоящий диспатч
    //     dispatchForMiddleware = dispatch;
    //   } else {
    //     dispatchForMiddleware = caller(middlewaresCallers[nextCallerIdx]);
    //   }
    //   middlewareDispatches.push(dispatchForMiddleware);
    // });
  };

  getMiddlewaresCallers();
  provideCallersToMiddlewares(0);
  // console.log('middlewaresCallers', middlewaresCallers);
  // console.log('middlewaresDispatches', middlewaresDispatches);

  return {
    dispatch,
    getState,
    subscribe,
    unsubscribe,
  };
};

export { createStore };
