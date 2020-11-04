import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';
import ReactDom from 'react-dom';
import { Shell } from './pages/shell';

const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#37474f"
    },
    secondary: {
      main: "#78909c"
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
