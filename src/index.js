import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import OrderedList from './orderedlist';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<OrderedList />, document.getElementById('test'));
registerServiceWorker();
