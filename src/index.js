import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { toJS } from 'mobx';
import { Provider } from 'mobx-react';

import 'antd/dist/antd.css';
import './css/index.css';

import rootStore from './store/RootStore';
import App from './components/App';

window.toJS      = toJS;
window.rootStore = rootStore;

ReactDOM.render(
  <Router>
    <Provider employeesStore={rootStore.employeesStore}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root'));
