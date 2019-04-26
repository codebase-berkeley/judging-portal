/*eslint-disable*/
import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.routeToOrganizer = this.routeToOrganizer.bind(this);
    this.routeToJudge = this.routeToJudge.bind(this);
  }

  routeToOrganizer() {
    const path = "/navigation";
    this.props.history.push(path);
  }

  routeToJudge() {
    const path = "/judge-login"
    this.props.history.push(path);
  }

  render() {
    return (
      <div className="home">
        <div className="home-container">
          <h1 className="home-title">Hi There!</h1>
          <p className="home-header">I am:</p>
          <div className="route-buttons">
            <button className="h-button" onClick={this.routeToOrganizer}>AN ORGANIZER</button>
            <button className="h-button" onClick={this.routeToJudge}>A JUDGE</button>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;






