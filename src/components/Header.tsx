import React, { FC } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { endpoints } from '@constants/apiEndpoints';
import apiService from '@services/apiService';
import showToast from '@utils/showToast';
import capitalize from '@utils/capitalize';

interface HeaderProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
}

const drawerWidth = 240;

const Header: FC<HeaderProps> = ({ setIsAuthenticated, setOpen, isMobile }) => {
  const history = useHistory();
  const location = useLocation();
  const page = capitalize(location.pathname.replace('/', ''));

  const handleLogout = async () => {
    const r = await apiService(endpoints.logout);

    if (r) {
      showToast(r.message, 'success');
      setIsAuthenticated(false);
      history.push('/login');
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: isMobile ? '100%' : `calc(100% - ${drawerWidth}px)`,
        ml: isMobile ? '100%' : `${drawerWidth}px`,
      }}
    >
      <Toolbar>
        {isMobile && (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} fontFamily="Pattaya">
          {page}
        </Typography>
        <Button color="inherit" variant="outlined" onClick={() => handleLogout()}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
