import React from 'react';
import ReactDom from 'react-dom';
import { Shell } from './pages/shell';

const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

export function App(): JSX.Element {
  return (
    <Shell />
  )
}

ReactDom.render(<App />, mainElement);
