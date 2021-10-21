import { createTheme } from '@mui/material';
import { blue, red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: blue,
    secondary: red,
  },
});

export default theme;
