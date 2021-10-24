import { INCREMENT, DECREMENT, TOGGLE_THEME } from './actionTypes';

const increment = () => {
  return { type: INCREMENT };
};
const decrement = () => {
  return { type: DECREMENT };
};
const toggle_theme = () => {
  return { type: TOGGLE_THEME };
};

export { increment, decrement, toggle_theme };
