/*eslint-disable*/
import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      judges: [],
      input_value: "",
      updated_score: ""
    };
    this.routeToOrganizer = this.routeToOrganizer.bind(this);
    this.routeToJudge = this.routeToJudge.bind(this);
    this.handleItemJudge = this.handleItemJudge.bind(this);
    this.handleItemScore = this.handleItemScore.bind(this);
    this.postJudge = this.postJudge.bind(this);
    this.putScore = this.putScore.bind(this);
  }

  routeToOrganizer() {
    let path = "/data-entry";
    this.props.history.push(path);
  }

  routeToJudge() {
    let path = "/judge-login"
    this.props.history.push(path);
  }

  componentDidMount() {
    this.getJudges().then(result => {
      let i;
      let judgeNames = [];
      for (i = 0; i < result.length; i++) { 
        judgeNames += result[i].api + " ";
      }
      this.setState({ judges: judgeNames });
    });
  }

  async getJudges() {
    let res = await fetch('/api/home');
    let res_json = res.json();
    return res_json
  }

  handleItemJudge(event) {
    this.setState({
      input_value: event.target.value
    });
  }

  handleItemScore(event) {
    this.setState({
      updated_score: event.target.value
    });
  }

  async postDummyValue() {
    let res = await fetch('/api/dummy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        dummy: this.state.input_value
      })
    });
    let res_json = res.json();
    return res_json;
  }

  async putDummyScore() {
    let judgeName = "lawrence"
    let res = await fetch('/api/score/' + judgeName, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        projectId: 1,
        score: parseInt(this.state.updated_score, 10)
      })
    });
    let res_json = res.json();
    return res_json;
  }

  postJudge() {
    this.postDummyValue().then(result => console.log(result)); 
  }

  putScore() {
    this.putDummyScore().then(result => console.log(result)); 
  }

  render() {
    return (
      <div className="App">
        <h1>Project Home</h1>
        <button onClick={this.routeToOrganizer}>ORGANIZER</button>
        <button onClick={this.routeToJudge}>JUDGE</button>
        <div>
          <input placeholder="Post Judge Name" value={this.state.input_value} onChange={this.handleItemJudge} />
          <button onClick={this.postJudge}>Submit</button>
        </div>
        <div>
          <input placeholder="Update Score" value={this.state.updated_score} onChange={this.handleItemScore} />
          <button onClick={this.putScore}>Submit</button>
        </div>
        <h3> Get Judge Names Example </h3>
        <p> { this.state.judges } </p>
      </div>
    );
  }
}
export default Home;
