import React, { ReactNode } from 'react';

interface LayoutProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}

const Layout = ({ children, setIsAuthenticated }: LayoutProps) => {
  return (
    <div>
      <main>
        {children}
        <button type="button" onClick={() => setIsAuthenticated(false)}>
          Logout
        </button>
      </main>
    </div>
  );
};

export default Layout;
