import React, { Component } from 'react';

import './App.css';

import CategoryInput from './components/CategoryInput/CategoryInput';
import DataEntry from './components/DataEntry/DataEntry';
import JudgeInfo from './components/JudgeInfo/JudgeInfo';


class App extends Component {
  render() {
    return (
      <div>
      	<CategoryInput />
        <DataEntry />
        <JudgeInfo />
      </div>
    );
  }
}

export default App;
