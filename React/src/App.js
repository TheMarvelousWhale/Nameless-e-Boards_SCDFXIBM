import React, { Component, Fragment } from 'react';
import './App.css';
import Dashboard from './Dashboard';

class App extends Component {
  render() {
    return (
      <Fragment>
        <div>
          <Dashboard />
        </div>
      </Fragment>
    );
  }
}

export default App;
