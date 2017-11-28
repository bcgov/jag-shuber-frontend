import * as React from 'react';
import './App.css';
import {Provider} from 'react-redux'
import store from './store'
// import Todos from './modules/todos/containers/VisibleTodos'
// import Footer from './modules/todos/components/Footer'
// import AddTodo from './modules/todos/containers/AddTodo'
import OnDutySheriffs from './modules/sheriffs/containers/OnDutySheriffs'

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
          
          <OnDutySheriffs/>
          
        </div>
      </Provider>
    );
  }
}

export default App;
