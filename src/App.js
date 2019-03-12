import React, { Component } from 'react';

import './App.css';

import CategoryInput from './components/CategoryInput/CategoryInput';
import DataEntry from './components/DataEntry/DataEntry';
import JudgeInfo from './components/JudgeInfo/JudgeInfo';
import Instructions from './components/JudgeLogin/Instructions';
import JudgeLogin from './components/JudgeLogin/JudgeLogin';


class App extends Component {
  render() {
    return (
      <div className="App">
      	<CategoryInput />
        <DataEntry />
        <JudgeInfo />
        <Instructions/>
        <JudgeLogin/>
      </div>
    );
  }
}

export default App;
