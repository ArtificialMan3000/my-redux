import { increment } from '../actionCreators';

// Применяет миддлвары и возвращает их диспатчи
const applyMiddleware = (...middlewares) => {
  return (createStore) => {
    // если не переданы мидлвары возвращаем оригинальный createStore
    if (!middlewares && middlewares.length === 0) {
      return createStore;
    }
    return (reducer, initialState) => {
      const store = createStore(reducer, initialState);

      // Активируем мидлвары, передавая им store.dispatch, store.getState и диспатч следующей мидлвары
      const activateMiddlewares = (middlewares, currDispatch) => {
        // если диспатч не передан, значит это store.dispatch
        currDispatch = currDispatch || store.dispatch;

        // Индекс последней мидлвары
        const lastIdx = middlewares.length - 1;

        // Методы стора dispatch и getState
        const storeDispatch = store.dispatch;
        const getState = store.getState;

        // Передаём последней мидлваре настоящий диспатч стора и получаем её диспатч
        const lastMiddleware = middlewares[lastIdx];
        currDispatch = lastMiddleware({ storeDispatch, getState })(
          currDispatch
        );

        // Удаляем активированную мидлвару из списка
        middlewares.pop();

        // Если это была последняя мидлвара, возвращаем её диспатч
        if (middlewares.length === 0) {
          return currDispatch;
        }

        // Активируем остальные мидлвары
        return activateMiddlewares(middlewares, currDispatch);
      };

      // Запускает цепочку диспатчей мидлвар
      let dispatchMiddlewares;
      // Получаем первый диспатч в цепочке
      dispatchMiddlewares = activateMiddlewares(middlewares, store.dispatch);
      // console.log('dispatchMiddlewares', dispatchMiddlewares);

      if (typeof dispatchMiddlewares !== 'function') {
        throw new TypeError('Полученный диспатч не является функцией');
      } else if (!dispatchMiddlewares) {
        throw new Error('Не удалось получить диспатч');
      }

      return {
        ...store,
        dispatch: dispatchMiddlewares,
      };
    };
  };
};

export { applyMiddleware };
