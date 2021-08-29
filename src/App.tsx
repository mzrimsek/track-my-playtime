import './App.css';

import { Box, CssBaseline, ThemeProvider, createTheme } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Counter } from './features/counter/Counter';
import { useMemo } from 'react';

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Box className="app">
          <div className="header">Track My Playtime</div>
          <div className="content">
            <BrowserRouter>
              <Switch>
                <Route path="/counter">
                  <Counter />
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
