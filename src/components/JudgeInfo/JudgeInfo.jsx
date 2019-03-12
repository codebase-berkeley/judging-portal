import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './JudgeInfo.css';
import Judge from './Judge';
import '../OrganizerPortal.css';

const options = ['one', 'two', 'three', 'four', 'four', 'four', 'four', 'four', 'four', 'four', 'four', 'four', 'four', 'four', 'four', 'four', 'four', 'five'];

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
    this.handleClickIndex = this.handleClickIndex.bind(this);
    this._onSelect = this._onSelect.bind(this);
  }

  _onSelect(option) {
    this.setState({ selected: option });
  }

  handleClickIndex(index, event){
    eval(this[event.target.name]).bind(this)(index, event)
  }

  removeTask(index, event) {
    const info = this.state.info
    info.splice(index, 1)    
    this.setState({info})
  }

  handleName(event) {
    this.setState({
      curr_name: event.target.value
    });
  }

  addInfo() {
    if (this.state.curr_name !== '' && this.state.selected !== '') {
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
    const info = (this.state.info||[]).map((name,index)=>(
      <ul className="judge-item">
        <div className="delete-button">
          <button name="removeTask" className="delete-button" onClick={event=>this.handleClickIndex(index,event)}>
              ×
          </button>
        </div>       
         <Judge
        name={name[0]}
        api={this.state.info[index][1]}
        color={this.state.info[index][2]}
          />
      </ul>
    ))

    return (
      <div className="judge-info-page">
        <p className="judge-info-title">Judge Information</p>
        <div className="input-list">
          <div className="entry-container">
            <div className="input-container">
              <p className="input-name-header">Judge Name</p>
              <input
                className="input-name"
                placeholder="Judge Name"
                value={this.state.curr_name}
                onChange={this.handleName}
              />

              <div className="input-api-header">
                Judge API
              </div>
              
              <div className="dropdown">
                <Dropdown
                  options={options}
                  onChange={this._onSelect}
                  value={defaultOption}
                  placeholder="Select an option"
                />
              </div>

              <button
                className="submit-button-judge"
                type="button"
                onClick={this.addInfo}
              >
                Submit
              </button>
            </div>

            <div className="judge-info-list-border">
              <div className="name-list-header">
                <p className = "name-text">
                  Name
                </p>           
              </div>

              <div className="api-list-header">
                <p className = "name-text">
                  API
                </p>
              </div>

              <div className="list">
                {info}
              </div>
              {
                this.state.name &&
                <li>{this.state.name}</li>
              }
            </div>
          </div>

          <div className= "buttons">
            <button className="page-button" >Prev</button>
            <button className="page-button">Next</button>
          </div>
        </div>
      </div>
    );
  }
}

export default JudgeInfo;
