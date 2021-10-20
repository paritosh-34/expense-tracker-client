import { ReactNode } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Layout from './Layout';

interface PrivateRouteProps {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}

const PrivateRoute = ({ isAuthenticated, setIsAuthenticated, children }: PrivateRouteProps) => (
  <Route>
    <Layout setIsAuthenticated={setIsAuthenticated}>
      {isAuthenticated ? children : <Redirect to="/login" />}
    </Layout>
  </Route>
);

export default PrivateRoute;
