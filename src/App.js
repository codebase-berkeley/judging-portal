import React, { Component } from 'react';
// import './App.css';
import './App.css';

import CategoryInput from './components/CategoryInput/CategoryInput';
import DataEntry from './components/DataEntry/DataEntry';
import Toolbar from './toolbar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Toolbar name="Trevor" />
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <CategoryInput />
        <DataEntry />
    );
  }
}

export default App;
