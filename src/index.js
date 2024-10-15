import React from 'react';
import ReactDOM from 'react-dom';


import { AppContainer } from './components/AppContainer.tsx';
import Description from './components/Description.tsx';

// @TODO fix warning: Warning: ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot
ReactDOM.render(<AppContainer radarId="radar"/>, document.getElementById('app'))
ReactDOM.render(<Description />, document.getElementById('description'));
