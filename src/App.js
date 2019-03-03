import React, { Component } from 'react';
// import './App.css';
import './App.css';

import CategoryInput from './components/CategoryInput/CategoryInput';
import DataEntry from './components/DataEntry/DataEntry';
import Toolbar from './toolbar';

class App extends Component {
  render() {
    return (
      <div>
        <CategoryInput />
        <DataEntry />
      </div>
    );
  }
}

export default App;
