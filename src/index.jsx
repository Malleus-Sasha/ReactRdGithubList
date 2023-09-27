import './index.less';
import React from 'react';
import { render } from 'react-dom';
import { store } from './reducers';
import { Provider } from 'react-redux';
import App from './components/App.jsx';

render(
  <Provider store={store}>
    <App/>
  </Provider>
  ,
  document.getElementById('root')
);
