/*eslint-disable*/
import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import Name from './Name';
import 'react-dropdown/style.css';
import './JudgeInfo.css';

const options = ['one', 'two', 'three'];

class JudgeInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curr_name: '',
      names: [],
      selected: ''
    };
    this.handleName = this.handleName.bind(this);
    this.addName = this.addName.bind(this);
    this._onSelect = this._onSelect.bind(this);
  }

  _onSelect(option) {
    console.log('You selected ', option.label);
    this.setState({ selected: option });
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

  addInfo() {
    if (this.state.curr_name !== '') {
      this.setState({
        curr_name: '',
        names: this.state.names.concat(this.state.curr_name)
      });
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

export default JudgeInfo;
