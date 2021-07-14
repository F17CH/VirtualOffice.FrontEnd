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
      main: "#00897b",
      light: "#e8f1ff",
      dark: "#005f56",
    },
    secondary: {
      main: "#9e9e9e",
      light: "#fafafa",
      dark: "#212121"
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
