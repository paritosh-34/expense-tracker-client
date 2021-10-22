import React, { FC, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Divider,
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  ListItemButton,
  ListSubheader,
  ListItem,
} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import TimelineIcon from '@mui/icons-material/Timeline';
import { AppContext } from '@store/context';
import capitalize from '@utils/capitalize';
import Logo from '@ui/Logo';
import MuiSwitch from '@ui/Switch/MuiSwitch';

interface SidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
}

const drawerWidth = 240;

const pages: [string, JSX.Element, string][] = [
  ['Create', <CreateIcon />, '/create'],
  ['Expenses', <TimelineIcon />, '/expenses'],
];

const Sidebar: FC<SidebarProps> = ({ open, setOpen, isMobile }) => {
  const { state, dispatch } = useContext(AppContext);

  const location = useLocation();
  const page = capitalize(location.pathname.replace('/', ''));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: 'toggleTheme', value: e.target.checked });

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={() => setOpen(false)}
      variant={isMobile ? 'temporary' : 'permanent'}
    >
      <Box
        sx={{
          width: drawerWidth,
          padding: 0,
          // backgroundColor: isMobile ? grey[100] : 'white',
          minHeight: '100vh',
        }}
      >
        <Toolbar>
          <Logo
            style={{
              fontSize: '1.5em',
              padding: '2em 0em',
            }}
            greyShadow
          />
        </Toolbar>
        <Divider />
        <List
          style={{ marginTop: '1em' }}
          subheader={
            <ListSubheader component="span" style={{ backgroundColor: 'transparent' }}>
              Pages
            </ListSubheader>
          }
        >
          {pages.map((item) => (
            <Link key={item[0]} to={item[2]}>
              <ListItemButton selected={page === item[0]}>
                <ListItemIcon>{item[1]}</ListItemIcon>
                <ListItemText style={{ fontWeight: 700 }}>{item[0]}</ListItemText>
              </ListItemButton>
            </Link>
          ))}
        </List>
        <List
          style={{ marginTop: '1em' }}
          subheader={
            <ListSubheader component="span" style={{ backgroundColor: 'transparent' }}>
              Theme
            </ListSubheader>
          }
        >
          <ListItem>
            <MuiSwitch label="Dark Mode" checked={state.isDarkMode} onChange={handleChange} />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
