/*eslint-disable*/
import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dummyAPIdata: [],
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
    this.getProjectName().then(result => this.setState({
      dummyAPIdata: result[0]['id']
    }))
  }

  async getProjectName() {
    let res = await fetch('/api/projects');
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
      </div>
    );
  }
}
export default Home;
