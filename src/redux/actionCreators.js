import {
  INCREMENT,
  DECREMENT,
  TOGGLE_THEME,
  MIDDLEWARE_LOG,
  LOG,
} from './actionTypes';

const increment = () => {
  return { type: INCREMENT };
};
const decrement = () => {
  return { type: DECREMENT };
};
const toggle_theme = () => {
  return { type: TOGGLE_THEME };
};
const middlewareLog = () => {
  return { type: MIDDLEWARE_LOG };
};
const log = () => {
  return { type: LOG };
};

export { increment, decrement, toggle_theme, middlewareLog, log };
