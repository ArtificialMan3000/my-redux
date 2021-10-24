export const testMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    console.log('middleware');
    next(action);
  };
