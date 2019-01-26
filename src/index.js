import React from 'react';
import ReactDOM from 'react-dom';

import AppContainer from './components/AppContainer.jsx';
import Description from './components/Description.jsx';

const appWrapper = document.getElementById('app');
appWrapper ? ReactDOM.render(<AppContainer radarId="radar"/>, appWrapper) : false;

const descriptionWrapper = document.getElementById('description');
descriptionWrapper ? ReactDOM.render(<Description />, descriptionWrapper) : false;
