import React, { Component } from 'react';
// import './App.css';
import './App.css';
import CategoryInput from './components/CategoryInput/CategoryInput';

class App extends Component {
  // constructor(p) {
  //   super(p);
  //   this.state = {};
  // }

  render() {
    return (
      <div className="App">
        <CategoryInput />
      </div>
    );
  }
}

export default App;
