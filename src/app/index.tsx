import * as React from 'react';
import { render } from 'react-dom';
import App from './App';
import { unregister } from './registerServiceWorker';
import './index.css';


render(
  <App />
  ,
  document.getElementById('root') as HTMLElement
);

// The Service work appears to be aggressively caching the application
// So i'm unregistering for now until we understand more about it
// see https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#opting-out-of-caching
// registerServiceWorker();
unregister();
