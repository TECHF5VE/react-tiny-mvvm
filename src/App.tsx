import * as React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import { TodoList } from './Components/TodoList/TodoList.view';
import { TodoInput } from './Components/TodoInput/TodoInput.view';

// const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid App-center">
        <div className="col-md-3" />
        <div className="col-md-6">
          <h1 className="App-title">Todo List Demo    <small>for React Tiny Mvvm</small></h1>
          <div className="row">
            <TodoInput />
          </div>
          <div className="row">
            <TodoList />
          </div>
        </div>
        <div className="col-md-3" />
      </div>
    );
  }
}

export default App;
