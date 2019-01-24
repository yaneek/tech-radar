import React from 'react';
import ReactDOM from 'react-dom';

import {redrawRadar} from './components/tech-radar/radar-actions';
import AppContainer from './components/AppContainer.jsx';
import Description from './components/Description.jsx';

const appWrapper = document.getElementById('app');
appWrapper ? ReactDOM.render(<AppContainer/>, appWrapper) : false;

const descriptionWrapper = document.getElementById('description');
descriptionWrapper ? ReactDOM.render(<Description />, descriptionWrapper) : false;

// @TODO move d3.js element into react component - inside AppContainer
redrawRadar();
