import React, { Component } from 'react';

import './App.css';

import CategoryInput from './components/CategoryInput/CategoryInput';
import DataEntry from './components/DataEntry/DataEntry';
import JudgeInfo from './components/JudgeInfo/JudgeInfo';
import ProjectInfo from './components/ProjectInfo/ProjectInfo';


class App extends Component {
  render() {
    return (
      <div className="App">
      	<ProjectInfo id = "03853" title = "Upsync"/>
      </div>
    );
  }
}

export default App;
