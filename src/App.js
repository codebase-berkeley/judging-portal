import React, { Component } from 'react';
import logo from './logo.svg';
// import './App.css';
import Toolbar from './toolbar';
import AwardList from './components/CategoryInput/AwardList.jsx';
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
       <AwardList listTitle="APIs" inputBackgroundText="+ add API"/>
        <CategoryInput />
      </div>
    );
  }
}

export default App;
