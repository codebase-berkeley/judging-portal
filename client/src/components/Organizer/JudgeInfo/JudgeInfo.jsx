import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Judge from './Judge';
import '../OrganizerPortal.css';

class JudgeInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curr_name: '',
      selected: '',
      info: [],
      options: [],
      deleted: []
    };
    this.handleName = this.handleName.bind(this);
    this.addInfo = this.addInfo.bind(this);
    this.handleClickIndex = this.handleClickIndex.bind(this);
    this._onSelect = this._onSelect.bind(this);
    this.routeToPrev = this.routeToPrev.bind(this);
    this.routeToNext = this.routeToNext.bind(this);

    this.postJudgeInfo = this.postJudgeInfo.bind(this);

  }

  async componentDidMount() {
    this.getJudgeInfo().then(result => {
      let i;
      const judgeinfo = [];
      for (i = 0; i < result.length; i+=1) { 
        judgeinfo[i] = [result[i].name, result[i].api];
      }
      this.setState({ info: judgeinfo });
    });
    this.getAPI().then(result => {
      let i;
      const apis = [];
      for (i = 0; i < result.length; i+=1) { 
        if (result[i].api != null) {
          apis[i] = result[i].api;
        }
      }
      this.setState({ options: apis });
    });
  }

  async getJudgeInfo() {
    const res = await fetch('/api/judgeinfo');
    const resJson = res.json();
    return resJson
  }

  async getAPI() {
    const res = await fetch(`/api/apis`);
    const resJson = res.json();
    return resJson
  }

  _onSelect(option) {
    this.setState({ selected: option });
  }

  handleClickIndex(index, event){
    this[event.target.name].bind(this)(index, event)
  }

  async removeTask(index) {
    await this.setState((prevState) => {
      const delInfo = prevState.info.slice();
      const judge = delInfo[index];

      delInfo.splice(index, 1)
      return {
        info: delInfo,
        deleted: judge
      } 
    });

    try {
      const res = await fetch('/api/deletejudge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          deleted: this.state.deleted
        })
      });
      const resJson = res.json();
      return resJson;

    } catch (error) {
      console.log("error");
    }
  }

  handleName(event) {
    this.setState({
      curr_name: event.target.value
    });
  }

  addInfo() {
      if (this.state.curr_name !== '' && this.state.selected !== '') {
        this.setState((prevState) => {
          const newInfo = prevState.info.concat([
            [prevState.curr_name, prevState.selected.label]
          ])
          return {
          info: newInfo,
          curr_name: '',
          selected: ''
        }
        });
      }
  }

  async postJudgeInfo() {
    try {
      const res = await fetch('/api/judgeinfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          info: [this.state.curr_name, this.state.selected.label],
        })
      });
      const resJson = res.json();
      return resJson;
    } catch (error) {
      console.log("error");
    }
  }

  postJudge() {
    this.postJudgeInfo().then(result => console.log(result));
  }

  routeToPrev() {
    const path = "/data-entry";
    this.props.history.push(path);
  }

  routeToNext() {
    this.postJudgeInfo().then(result => console.log(result));
    const path = "/project-breakdown";
    this.props.history.push(path);
  }

  render() {
    const defaultOption = this.state.selected;
    const info = (this.state.info||[]).map((name,index)=>(
      <ul className="judge-item">
        <div className="delete-button">
          <button name="removeTask" type="submit" className="delete-button" onClick={event=>this.handleClickIndex(index,event)}>
              ×
          </button>
        </div>
         <Judge
          name={name[0]}
          api={this.state.info[index][1]}
        />
      </ul>
    ))

    return (
      <div className="page-background" id= "JudgeInfo">
        <div className="page-header">JUDGE INFORMATION</div>
        <div className="content-background">
          <div className="judge-input-list">
            <div className="judge-input">

              <div className="judge-name-title">JUDGE NAME</div>
              <input
                className="judge-name-input"
                placeholder="Judge Name"
                value={this.state.curr_name}
                onChange={this.handleName}
              />

              <div className="judge-api-title">JUDGE API</div>
              <div className="judge-dropdown">
                <Dropdown
                  options={this.state.options}
                  onChange={this._onSelect}
                  value={defaultOption}
                  placeholder="Select an API"
                />
              </div>

              <button
                className="button"
                type="button"
                onClick={() => { this.addInfo(); this.postJudge();}}
              >
                SUBMIT
              </button>
            </div>

            <div className="judge-list">
              <div className="judge-list-name">NAME</div>
              <div className="judge-list-api">API</div>
              <div className="list">{info}</div>
            </div>
          </div>

          <div className= "buttons nav judge-button">
            <button className="button" type="submit" onClick={this.routeToPrev}>PREV</button>
            <button className="button" type="submit" onClick={this.routeToNext}>NEXT</button>
          </div>
        </div>
      </div>
    );
  }
}

export default JudgeInfo;
