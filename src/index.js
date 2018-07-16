import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import App from './App';
import { basename } from './config';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router basename={basename}>
    <App />
  </Router>
  , document.getElementById('root'),
);
registerServiceWorker();
