/* eslint-disable */

import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './JudgeInfo.css';
import Judge from './Judge';

const options = ['one', 'two', 'three', 'four'];

class JudgeInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curr_name: '',
      selected: '',
      info: [],
      count: 0
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
        info: this.state.info.concat([
          [this.state.curr_name, this.state.selected.label, this.state.count]
        ]),
        curr_name: '',
        count: this.state.count + 1,
        selected: ''
      });
    }
  }

  render() {
    const defaultOption = this.state.selected;
    

    return (
      <div className="judge-info-page">
        <p className="judge-info-title">Judge Information</p>

        <div className="input-list">
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
          </div>

          <div className="judge-info-list-border">
            <ul className="judge-info-list">
              <p className="name-list-header">Name</p>
              <p className="api-list-header">API</p>
              {this.state.info.map((name, api) => (
                  <Judge
                  name={name[0]}
                  api={this.state.info[api][1]}
                  color={this.state.info[api][2]}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default JudgeInfo;
