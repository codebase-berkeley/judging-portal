/*eslint-disable*/
import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './JudgeInput.css';
import Name from './Name';

class JudgeInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curr_name: '',
      names: []
    };
    this.handleName = this.handleName.bind(this);
    this.addName = this.addName.bind(this);
  }

  handleName(event) {
    this.setState({
      curr_name: event.target.value
    });
  }

  addName() {
    if (this.state.curr_name !== '') {
      this.setState({
        curr_name: '',
        names: this.state.names.concat(this.state.curr_name)
      });
    }
  }

  render() {
    const options = ['one', 'two', 'three'];
    const defaultOption = 'Select API';
    return (
      <div className="judge-input-page">
        <div className="judge-input-header">
          <p>Judge Information</p>
        </div>

        <div className="input-container">
          <p>Judge Name</p>
          <input
            className="name-input"
            placeholder="Judge Name"
            value={this.state.curr_name}
            onChange={this.handleName}
          />
          <p>Judge API</p>
          <Dropdown
            options={options}
            onChange={this._onSelect}
            value={defaultOption}
            placeholder="Select an option"
          />

          <button
            className="submit-button"
            type="button"
            onClick={this.addName}
          >
            Submit
          </button>
        </div>

        <ul className="judge-name-list">
          {this.state.names.map(item => (
            <Name key={item.id} text={item} />
          ))}
        </ul>
      </div>
    );
  }
}

export default JudgeInput;
