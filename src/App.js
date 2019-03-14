/* eslint-disable */
import React, { Component } from 'react';


import { Route, Switch } from 'react-router-dom';

import './App.css';



import ProjectInfo from './components/ProjectInfo/ProjectInfo';
import CategoryInput from './components/CategoryInput/CategoryInput';
import DataEntry from './components/DataEntry/DataEntry';
import JudgeInfo from './components/JudgeInfo/JudgeInfo';
import Instructions from './components/JudgeLogin/Instructions';
import JudgeLogin from './components/JudgeLogin/JudgeLogin';
import ScoringOverview from './components/ScoringOverview/ScoringOverview';
import CategoryInput from './components/Organizer/CategoryInput/CategoryInput';
import DataEntry from './components/Organizer/DataEntry/DataEntry';
import JudgeInfo from './components/Organizer/JudgeInfo/JudgeInfo';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/categories" component={CategoryInput} />
          <Route path="/data-entry" component={DataEntry} />
          <Route path="/judge-info" component={JudgeInfo} />
          <Route path="/overview" component={ScoringOverview} />
          <Route path="/instructions" component={Instructions} />
          <Route path="/judge-login" component={JudgeLogin} />
          <Route path="/project-info" component={ProjectInfo} />
        </Switch>
      </div>
    );
  }
}

export default App;
