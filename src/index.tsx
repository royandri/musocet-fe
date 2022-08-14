import React from 'react';
import ReactDOM from 'react-dom/client';
import Application from './Application';
import reportWebVitals from './reportWebVitals';
import SocketContextComponent from './context/SocketContextComponent';

import Home from "./pages/Home";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <SocketContextComponent>
    <Application />
  </SocketContextComponent>
  // <Home />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();