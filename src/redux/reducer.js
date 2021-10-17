const reducer = (state, { type, payload }) => {
  switch (type) {
    case '__INIT__': {
      state = payload;
      break;
    }
    case 'INCREMENT': {
      state = { ...state, count: state.count + 1 };
      break;
    }
    case 'DECREMENT': {
      state = { ...state, count: state.count - 1 };
      break;
    }
  }
  return state;
};

export { reducer };
