import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';

import './App.css';

import CategoryInput from './components/CategoryInput/CategoryInput';
import DataEntry from './components/DataEntry/DataEntry';
import JudgeInfo from './components/JudgeInfo/JudgeInfo';
import ScoringOverview from './components/ScoringOverview/ScoringOverview';


class App extends Component {
  render() {
    return (
      <div className="App">
      <Switch>
      	<Route path="/categories" component={CategoryInput} />
        <Route path="/data-entry" component={DataEntry} />
        <Route path="/judge-info" component={JudgeInfo}/>
        <Route path="/overview" component={ScoringOverview}/>
      </Switch>
      </div>
    );
  }
}

export default App;
