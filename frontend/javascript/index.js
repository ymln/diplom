import React from 'react';
import ReactDOM from 'react-dom';

import Store from './Store';
import App from './App';

import 'bootstrap/dist/js/npm';
import './styles.less';

let store = new Store();
let root = ReactDOM.render(
    <App store={store} />,
    document.getElementById('app')
);
store.onChange(() => root.forceUpdate());
