import * as React from 'react';
import './App.css';
import './Glyphicons.css'
import { Provider } from 'react-redux'
import store from './store'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap'
// import Todos from './modules/todos/containers/VisibleTodos'
// import Footer from './modules/todos/components/Footer'
// import AddTodo from './modules/todos/containers/AddTodo'
import OnDutySheriffs from './modules/sheriffs/containers/OnDutySheriffs';
import UnassignedTaskList from './modules/tasks/containers/UnassignedTaskList';
import Footer from './components/Footer';

const logo = require('./bc_logo_transparent.png');

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div id="header-main" className="navbar navbar-default navbar-fixed-top">
            <img src={logo} className="App-logo" alt="logo" />
            <div className="navigationRibbon hidden-xs" role="navigation"/>
          </div>
          
          <div id="topicTemplate" className="template container" style={{paddingTop:64}}>
          <Grid>
            <Row>
              <Col lg={10}>
                <OnDutySheriffs />
              </Col>
              <Col lg={2}>
                <UnassignedTaskList />
              </Col>
            </Row>
          </Grid>
          <Footer/>
          </div>
        </div>
      </Provider>

    );
  }
}

export default DragDropContext(HTML5Backend)(App);
