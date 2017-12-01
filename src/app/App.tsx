import * as React from 'react';
import './App.css';
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
import OnDutySheriffs from './modules/sheriffs/containers/OnDutySheriffs'
import UnassignedTaskList from './modules/tasks/containers/UnassignedTaskList'

const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Shuber</h2>
          </div>

          <Grid fluid>
            <Row>
              <Col lg={10}>
                <OnDutySheriffs />
              </Col>
              <Col lg={2}>
                <UnassignedTaskList />
              </Col>
            </Row>
          </Grid>

        </div>
      </Provider>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
