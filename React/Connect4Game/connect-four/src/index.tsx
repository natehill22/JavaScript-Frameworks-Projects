import './index.css';
import React from "react"
import ReactDOM from 'react-dom/client';
import { App } from './components';

//Initializes the app with 7 columns and 6 rows

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App columns={7} rows={6} />
  </React.StrictMode>
);

