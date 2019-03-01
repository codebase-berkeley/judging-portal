/*eslint-disable*/
import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
//import Name from './Name';
import 'react-dropdown/style.css';
import './JudgeInfo.css';
import Judge from './Judge';

const options = ['one', 'two', 'three', 'four'];

class JudgeInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curr_name: '',
      names: [],
      selected: '',
      info: []
    };
    this.handleName = this.handleName.bind(this);
    this.addInfo = this.addInfo.bind(this);
    this._onSelect = this._onSelect.bind(this);
  }

  _onSelect(option) {
    this.setState({ selected: option });
  }

  handleName(event) {
    this.setState({
      curr_name: event.target.value
    });
  }

  addInfo() {
    if (this.state.curr_name !== '') {
      this.setState({
        curr_name: '',
        info: this.state.info.push([
          this.state.curr_name,
          this.state.selected.label
        ])
      });
    }
  }

  createJudge() {
    var i;
    for (i = 0; i < info.length; i++) {
      if (i % 2 == 0) {
        <Judge name={this.curr_name} api={option.label} color={false} />;
      } else {
        <Judge name={this.curr_name} api={option.label} color={true} />;
      }
    }
  }

  render() {
    const defaultOption = this.state.selected;
    const placeHolderValue =
      typeof this.state.selected === 'string'
        ? this.state.selected
        : this.state.selected.label;

    return (
      <div className="judge-info-page">
        <p className="judge-info-title">Judge Information</p>

        <div className="input-container">
          <p className="input-name-header">Judge Name</p>
          <input
            className="input-name"
            placeholder="Judge Name"
            value={this.state.curr_name}
            onChange={this.handleName}
          />

          <p className="input-api-header">Judge API</p>

          <div className="dropdown">
            <Dropdown
              options={options}
              onChange={this._onSelect}
              value={defaultOption}
              placeholder="Select an option"
            />
          </div>

          <button
            className="submit-button"
            type="button"
            onClick={this.addInfo}
          >
            Submit
          </button>

          <div className="table" />
        </div>
      </div>
    );
  }
}

export default JudgeInfo;
