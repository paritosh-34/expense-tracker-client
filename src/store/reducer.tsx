import { globalState, Actions } from '@interfaces/global';

const globalReducer = (state: globalState, action: Actions): globalState => {
  switch (action.type) {
    case 'toggleTheme':
      window.localStorage.setItem('appTheme', action.value ? 'dark' : 'light');
      return { ...state, isDarkMode: action.value };
    default:
      return state;
  }
};

export default globalReducer;
