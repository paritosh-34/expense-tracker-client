import { useState, useEffect } from 'react';
import { Switch, Route, useHistory, useLocation, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AppProvider } from '@store/context';
import { requestRefresh } from '@services/authService';
import Login from '@pages/Login';
import Signup from '@pages/Signup';
import Expenses from '@pages/Expenses';
import Create from '@pages/Create';
import MyThemeProvider from '@theme/MyThemeProvider';
import Loading from '@components/Loading';
import PrivateRoute from '@components/PrivateRoute';

const App = () => {
  const history = useHistory();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleTokenRefresh = async () => {
      const r = await requestRefresh();

      if (r) {
        setIsAuthenticated(true);

        if (location.pathname === '/login' || location.pathname === '/signup')
          history.push('/expenses');
      }
      setIsLoading(false);
    };
    void handleTokenRefresh();
  }, []);
  if (isLoading) return <Loading background />;

  return (
    <AppProvider>
      <MyThemeProvider>
        <Switch>
          <Redirect from="/" to="/login" exact />
          <Route path="/login">
            {isAuthenticated ? (
              <Redirect from="/login" to="/expenses" />
            ) : (
              <Login setIsAuthenticated={setIsAuthenticated} />
            )}
          </Route>
          <Route path="/signup">
            {isAuthenticated ? (
              <Redirect from="/signup" to="/expenses" />
            ) : (
              <Signup setIsAuthenticated={setIsAuthenticated} />
            )}
          </Route>
          <Route path="/expenses">
            <PrivateRoute isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}>
              <Expenses />
            </PrivateRoute>
          </Route>
          <Route path="/create">
            <PrivateRoute isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}>
              <Create />
            </PrivateRoute>
          </Route>
        </Switch>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </MyThemeProvider>
    </AppProvider>
  );
};

export default App;
