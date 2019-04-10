/*eslint-disable*/
import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      judges: [],
      input_value: ""
    };
    this.routeToOrganizer = this.routeToOrganizer.bind(this);
    this.routeToJudge = this.routeToJudge.bind(this);
    this.handleItem = this.handleItem.bind(this);
    this.postItem = this.postItem.bind(this);
  }

  routeToOrganizer() {
    let path = "/categories";
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
        judgeNames += result[i].name + " ";
      }
      this.setState({ judges: judgeNames });
    });
  }

  async getJudges() {
    let res = await fetch('/api/home');
    let res_json = res.json();
    return res_json
  }

  handleItem(event) {
    this.setState({
      input_value: event.target.value
    });
  }

  async postDummyValue(){
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


  postItem() {
    this.postDummyValue().then(result => console.log(result)); 
  }

  render() {
    return (
      <div className="App">
        <h1>Project Home</h1>
        <button onClick={this.routeToOrganizer}>ORGANIZER</button>
        <button onClick={this.routeToJudge}>JUDGE</button>
        <div> {this.state.dummyAPIdata} </div>
        <input placeholder="Post Request Data" value={this.state.input_value} onChange={this.handleItem} />
        <button  onClick={this.postItem}>Submit</button>
        <h3> { this.state.judges } </h3>
      </div>
    );
  }
}
export default Home;
