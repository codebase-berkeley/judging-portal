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
      options: []
    };
    this.handleName = this.handleName.bind(this);
    this.addInfo = this.addInfo.bind(this);
    this.handleClickIndex = this.handleClickIndex.bind(this);
    this._onSelect = this._onSelect.bind(this);
    this.routeToPrev = this.routeToPrev.bind(this);
  }

  componentDidMount() {
    this.getJudgeInfo().then(result => this.setState({
      curr_name: result['name'],
      selected: result['api'],
    }))
  }

  async getJudgeInfo() {
    let res = await fetch('/api/judgelist');
    let res_json = res.json();
    return res_json
  }

  async postJudgeInfo(){
    let res = await fetch('/db/judgelist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.curr_name,
        api: this.state.selected
      })
    });
    let res_json = res.json();
    return res_json;
  }

  _onSelect(option) {
    this.setState({ selected: option });
  }

  handleClickIndex(index, event){
    this[event.target.name].bind(this)(index, event)
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

  routeToPrev() {
    this.postJudge().then(result => console.log(result));
    this.props.history.push("/data-entry");
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
                onClick={this.addInfo}
                onClick={this.postJudge}
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
            <button className="button" onClick={this.routeToPrev}>PREV</button>
            <button className="button">NEXT</button>
          </div>
        </div>
      </div>
    );
  }
}

export default JudgeInfo;
