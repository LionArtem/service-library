import React from 'react';
import ReactDOM from 'react-dom/client';
import './peges/index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redax/store';
import { Provider } from 'react-redux';
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
}
