/* eslint-disable */
import React, { Component } from 'react';

import './components/Organizer/OrganizerPortal.css';

import CategoryInput from './components/Organizer/CategoryInput/CategoryInput';
import DataEntry from './components/Organizer/DataEntry/DataEntry';
import JudgeInfo from './components/Organizer/JudgeInfo/JudgeInfo';

class App extends Component {

  render() {
    return (
      <div className="App">
      	<CategoryInput />
        <DataEntry />
        <JudgeInfo />
      </div>
    );
  }
}

export default App;
