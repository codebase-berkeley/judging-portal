import React, { Component } from 'react';
import logo from './logo.svg';
// import './App.css';
import Toolbar from './toolbar';
import AwardList from './components/CategoryInput/AwardList.jsx';

class App extends Component {
  // constructor(p) {
  //   super(p);
  //   this.state = {};
  // }

  render() {
    return (
      <div className="App">
       <AwardList listTitle="APIs" inputBackgroundText="+ add API"/>
      </div>
    );
  }
}

export default App;
