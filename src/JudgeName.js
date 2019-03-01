/* eslint-disable */

import React, { Component } from 'react';
import './JudgeName.css';
import Name from './Name';
import Dropdown from './Dropdown';

class JudgeName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curr_name: '',
      names: [],
      api: [
        {
          id: 0,
          title: 'one',
          selected: false,
          key: 'api'
        },
        {
          id: 1,
          title: 'two',
          selected: false,
          key: 'api'
        },
        {
          id: 2,
          title: 'three',
          selected: false,
          key: 'api'
        },
        {
          id: 3,
          title: 'four',
          selected: false,
          key: 'api'
        },
        {
          id: 4,
          title: 'five',
          selected: false,
          key: 'api'
        },
        {
          id: 5,
          title: 'six',
          selected: false,
          key: 'api'
        }
      ]
    };

    this.handleName = this.handleName.bind(this);
    this.addName = this.addName.bind(this);
  }

  resetThenSet = (id, key) => {
    const temp = JSON.parse(JSON.stringify(this.state[key]));
    temp.forEach(item => {
      item.selected = false;
    });
    temp[id].selected = true;
    this.setState({
      [key]: temp
    });
  };

  toggleSelected(id, key) {
    const temp = this.state[key];
    temp[id].selected = !temp[id].selected;
    this.setState({
      [key]: temp
    });
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
            title="Judge API"
            list={this.state.api}
            resetThenSet={this.resetThenSet}
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

export default JudgeName;
