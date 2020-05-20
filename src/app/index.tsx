import * as React from 'react';
import { render } from 'react-dom';
import { unregister } from './registerServiceWorker';
import store, { initStore } from './store';
import { Provider } from 'react-redux';
// Import our resources and assets before our RootLayout
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/bcgov-theme.css';
import './assets/styles/glyphicons.css';
import './index.css';
import RootLayout from './RootLayout';

initStore();

render(
  <Provider store={store}>
    <RootLayout />
  </Provider>
  ,
  document.getElementById('root') as HTMLElement
);

// The Service work appears to be aggressively caching the application
// So i'm unregistering for now until we understand more about it
// see https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#opting-out-of-caching
// registerServiceWorker();
unregister();
