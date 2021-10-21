import React, { FC } from 'react';
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
} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import TimelineIcon from '@mui/icons-material/Timeline';
import { grey } from '@mui/material/colors';
import capitalize from '@utils/capitalize';
import Logo from '@ui/Logo';

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
  const location = useLocation();
  const page = capitalize(location.pathname.replace('/', ''));

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
          backgroundColor: isMobile ? grey[100] : 'white',
          minHeight: '100vh',
        }}
      >
        <Toolbar>
          <Logo
            style={{
              fontSize: '1.5em',
              padding: '2em 0em',
              textShadow: `2px 2px 0px ${grey[400]}`,
            }}
          />
        </Toolbar>
        <Divider />
        <List
          style={{ marginTop: '1em' }}
          subheader={<ListSubheader component="div">Pages</ListSubheader>}
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
      </Box>
    </Drawer>
  );
};

export default Sidebar;
