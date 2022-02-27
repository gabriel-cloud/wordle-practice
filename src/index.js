import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import './normalise.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { chooseWord } from './wordList/wordlist';

const todayWord = chooseWord().toUpperCase();

ReactDOM.render(
  <React.StrictMode>
    <App todayWordFixed={todayWord} />
  </React.StrictMode>,
  document.getElementById('root')
);
