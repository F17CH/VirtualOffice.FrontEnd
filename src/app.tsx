import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';
import ReactDom from 'react-dom';
import { Shell } from './components/shell';
import "core-js/stable";
import "regenerator-runtime/runtime";

import  "@fontsource/m-plus-1p/index.css";
import "@fontsource/roboto/index.css";

const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#009688",
      light: "#006f65",
      dark: "#006f65",
    },
    secondary: {
      main: "#263238",
      light: "#304047",
      dark: "#1e272c"
    },
    error: {
      main: "#ff0000"
    },
  },
  typography: {
    fontFamily: [
      "sans-serif"
    ].join(','),
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
