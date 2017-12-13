import * as React from 'react';
import './App.css';
import './Glyphicons.css'
import { Provider } from 'react-redux'
import store from './store'
import {
  Route,
  // withRouter,
  BrowserRouter as Router
} from "react-router-dom";


import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {
  Contact,
  Home,
  Stuff
} from './pages'

import Footer from './components/Footer';
import Navigation from './components/Navigation'

class Layout extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div className="App">
        <Navigation />
        <div id="topicTemplate" className="template container" style={{ marginTop: 5 }}>
          <Route exact path='/' component={Home} />
          <Route path='/stuff' component={Stuff} />
          <Route path='/contact' component={Contact} />
        </div>
        <Footer />
      </div>
    );
  }
}

// const LayoutWithRouter = withRouter(Layout);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Layout/>
        </Router>
      </Provider>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
