export interface globalState {
  isDarkMode: boolean;
}

export type Actions = {
  type: 'toggleTheme';
  value: boolean;
};

export type globalContext = {
  state: globalState;
  dispatch: React.Dispatch<Actions>;
};
