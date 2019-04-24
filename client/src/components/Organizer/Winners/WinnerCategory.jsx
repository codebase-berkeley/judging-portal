import React, { Component } from 'react';
import '../OrganizerPortal.css';
import WinnerCategoryItem from './WinnerCategoryItem';

class WinnerCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            winnerList: []
        };
      }
    
    componentDidMount() {
        const projects = this.props.projects;
        var i;
        console.log(projects);
        const listOfWinners = [];
        for (i = 0; i < projects.length; i += 1) {
            const currProj = projects[i];
            listOfWinners.push(<WinnerCategoryItem name={currProj.projectname} score={currProj.score} judge={currProj.judgename} />);
        }

        this.setState({
            winnerList: listOfWinners
        })
    }

    render() {

        return (
          <div className="winner-info">
              <div className="api-name">{this.props.api}</div>
              

              <div className="w-content-breakdown">
                  <div className="w-scored-section">
                      <div className="w-project-list">
                          <div className="w-project-list-name">NAME</div>
                          <div className="w-project-list-name">SCORE</div>
                          <div className="w-project-list-name">JUDGE</div>
                      </div>
                      {this.state.winnerList}
                  </div>
              </div>
          </div>
        );
    }
}

export default WinnerCategory;
