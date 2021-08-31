import './App.css';

import { Box, CssBaseline, ThemeProvider, createTheme } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Counter } from './features/counter/Counter';
import { useMemo } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';

import { firebase } from 'helpers';
import { Login } from 'features/login/Login';
import { Home } from 'features/home/Home';
import { Register } from 'features/register/Register';

function App(): JSX.Element {
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const prefersDarkMode = false;
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light'
        }
      }),
    [prefersDarkMode]
  );

  const [user, loading, error] = useAuthState(firebase.auth());

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Box className="app">
          <div className="header">Track My Playtime</div>
          <div className="content">
            <BrowserRouter>
              <Switch>
                
              </Switch>
              <Switch>
                <Route path="/">
                  <Home></Home>
                </Route>
                <Route path="/register">
                  <Register></Register>
                </Route>
                <Route path="/login">
                  <Login></Login>
                </Route>
                <Route path="/app">
                   <Route path="/counter">
                    <Counter />
                  </Route>
                </Route>
              </Switch>
            </BrowserRouter>
          </div>
        </Box>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
