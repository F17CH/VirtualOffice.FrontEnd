import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';
import ReactDom from 'react-dom';
import { Shell } from './pages/shell';
import "core-js/stable";
import "regenerator-runtime/runtime";

const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2e7031",
      dark: "#1e1e1e",
    },
    secondary: {
      main: "#43a047",
      light: "#b0bec5"
    },
    error: {
      main: "#ff0000"
    },
  },
  typography: {
    fontFamily: [
      'Roboto'
    ].join(','),
    h3: {
      fontSize: "0.8rem"
    }
  }
});

export function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <Shell />
    </ThemeProvider>
  )
}

ReactDom.render(<App />, mainElement);
