const reducer = (state, action) => {
  switch (action.type) {
    case 'increment': {
      state = { ...state, count: state.count + 1 };
      break;
    }
    case 'decrement': {
      state = { ...state, count: state.count - 1 };
      break;
    }
  }
  return state;
};

export { reducer };
