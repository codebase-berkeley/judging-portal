import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dummyAPIdata: []
    };
    this.routeToOrganizer = this.routeToOrganizer.bind(this);
    this.routeToJudge = this.routeToJudge.bind(this);
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

  render() {
    return (
      <div className="App">
        <h1>Project Home</h1>
        <button onClick={this.routeToOrganizer}>ORGANIZER</button>
        <button onClick={this.routeToJudge}>JUDGE</button>
        <div> {this.state.dummyAPIdata} </div>
      </div>
    );
  }
}
export default Home;
