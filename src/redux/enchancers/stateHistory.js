// Ведёт историю состояний
const stateHistory = (createStore) => {
  return (reducer, initialState) => {
    // Получаем оригинальный стор
    const store = createStore(reducer, initialState);
    // Хранилище истории всех стейтов
    const stateHistory = [store.getState()];

    // Добавляет стейт в историю
    const addStateToHistory = function (newState) {
      stateHistory.push(newState);
    };

    // Переопределяет старый диспатч, добавляя функциональность истории
    const dispatch = function (action) {
      // Вызываем старый диспатч
      store.dispatch(action);

      // Добавляем стейт в историю
      addStateToHistory(store.getState());
      console.log(store.getState());

      return action;
    };

    // Получает историю стейтов
    const getHistory = () => {
      return stateHistory;
    };

    return {
      ...store,
      dispatch,
      getHistory,
    };
  };
};

export { stateHistory };
