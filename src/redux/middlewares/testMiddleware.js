export const testMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    console.log('middleware');
    console.log(getState());
    next(action);
  };
