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
        const {projects} = this.props;
        const listOfWinners = [];
        for (let i = 0; i < projects.length; i += 1) {
            const currProj = projects[i];
            listOfWinners.push(<WinnerCategoryItem rank={i+1} name={currProj.projectname} score={currProj.score} judge={currProj.judgename} />);
        }

        this.setState({
            winnerList: listOfWinners
        })
    }

    render() {

        return (
            <div className="w-content-breakdown">
                <div className="w-scored-section">
                    <div className="w-project-list">
                        <div className="w-project-list-name">RANK</div>
                        <div className="w-project-list-name">NAME</div>
                        <div className="w-project-list-name">SCORE</div>
                        <div className="w-project-list-name">JUDGE</div>
                    </div>
                    {this.state.winnerList}
                </div>
            </div>
        );
    }
}

export default WinnerCategory;
