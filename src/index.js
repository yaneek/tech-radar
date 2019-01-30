import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import 'react-app-polyfill/ie11';

import AppContainer from './components/AppContainer.jsx';
import Description from './components/Description.jsx';

ReactDOM.render(<AppContainer radarId="radar"/>, document.getElementById('app'))
ReactDOM.render(<Description />, document.getElementById('description'));
