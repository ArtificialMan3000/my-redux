export const testMiddleware2 =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    console.log('middleware2');

    next(action);
  };
