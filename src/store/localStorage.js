export const getStateFromStorage = (storageName, intialState) => {
  try {
    const serializedState = localStorage.getItem(storageName);
    if (serializedState === null) {
      return intialState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return intialState;
  }
};

export const saveStateToStorage = (state, storageName) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(storageName, serializedState);
  } catch {
    // ignore write errors
  }
};
