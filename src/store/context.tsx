import React, { createContext, useReducer } from 'react';
import { globalContext, globalState } from '@interfaces/global';
import globalReducer from './reducer';

const storageValue = window.localStorage.getItem('appTheme') === 'dark';

const initialState: globalState = {
  isDarkMode: storageValue,
};

const AppContext = createContext<globalContext>({
  state: initialState,
  dispatch: () => null,
});

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export { AppProvider, AppContext };
