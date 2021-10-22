import { FC, useContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { blue, red } from '@mui/material/colors';
import { AppContext } from '@store/context';

const MyThemeProvider: FC = ({ children }) => {
  const { state } = useContext(AppContext);

  const theme = createTheme({
    palette: {
      mode: state.isDarkMode ? 'dark' : 'light',
      primary: blue,
      secondary: red,
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MyThemeProvider;
