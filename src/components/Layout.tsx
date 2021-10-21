import React, { ReactNode, useEffect, useState } from 'react';
import { Toolbar } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}

const Layout = ({ children, setIsAuthenticated }: LayoutProps) => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      const width = window.innerWidth;

      if (width <= 1000 && !isMobile) setIsMobile(true);
      else if (width > 1000 && isMobile) setIsMobile(false);
    };

    checkWidth();
    window.addEventListener('resize', checkWidth);

    return () => window.removeEventListener('resize', checkWidth);
  }, [isMobile, setIsMobile]);

  return (
    <>
      <Header setIsAuthenticated={setIsAuthenticated} setOpen={setOpen} isMobile={isMobile} />
      <Sidebar open={open} setOpen={setOpen} isMobile={isMobile} />
      <Toolbar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
