export const testMiddleware3 =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    console.log('middleware3');

    next(action);
  };
