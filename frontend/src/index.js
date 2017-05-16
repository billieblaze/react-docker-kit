import "babel-polyfill"
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import App from './App';
const root = document.getElementById('root');

import todoApp from './reducers/reducers'

const store = createStore(
  todoApp,
)
console.log(store.getState())
const action = type => store.dispatch({type})

require('./style.css');

render(<Provider store = {store}><App /></Provider>, root);
