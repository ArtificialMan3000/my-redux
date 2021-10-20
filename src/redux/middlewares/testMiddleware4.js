export const testMiddleware4 =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    console.log('middleware4');

    next(action);
  };
