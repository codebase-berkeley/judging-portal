import React, { Component } from 'react';

import './App.css';

import CategoryInput from './components/CategoryInput/CategoryInput';
import DataEntry from './components/DataEntry/DataEntry';
import JudgeInfo from './components/JudgeInfo/JudgeInfo';
import ScoringOverview from './components/ScoringOverview/ScoringOverview';


class App extends Component {
  render() {
    return (
      <div className="App">
      	<CategoryInput />
        <DataEntry />
        <JudgeInfo/>
        <ScoringOverview/>
      </div>
    );
  }
}

export default App;
