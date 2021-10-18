import { increment } from './actionCreators';

// Применяет миддлвары и возвращает их диспатчи
const applyMiddleware = (...middlewares) => {
  return middlewares;
};

const testMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    console.log('middleware');
    console.log(getState());
    next(action);
  };
const testMiddleware2 =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    console.log('middleware2');
    console.log(getState());
    // fetch('https://yandex.ru', { mode: 'no-cors' })
    //   .then((response) => {
    //     console.log(response);
    //     response.text();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //   });

    next(action);
  };

export { applyMiddleware, testMiddleware, testMiddleware2 };
