import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import './WinnerPage.css';
import Dropdown from 'react-dropdown';
import ReactTable from "react-table";


class WinnerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            winners: {}
        }
        this.getWinners = this.getWinners.bind(this);
    }

    async componentDidMount() {
        const winner = await this.getWinners();
        await this.setState({
            winners: winner
        })
        console.log(this.state.winners);
    }

    async getWinners() {
        const res = await fetch('/api/winners');
        const resJson = res.json();
        return resJson;
    }

    render() {
        return (
            <div className="page-background" id="JudgeInfo">
                <div className="page-header">WINNERS</div>
                <div className="content-background">
                    {Object.values(this.state.winners).map((winnerJSON, index) => (
                        <div>
                            <Collapsible openedClassName="category" className="category" trigger={Object.keys(this.state.winners)[index]} transitionTime={100}>
                                <div className = "winner-list">
                                <h1>Name Judge Score</h1>
                                {winnerJSON.map((project, i) => (
                                    <ul>
                                        <div>
                                            {i + 1 + ": " + project["projectname"] + " - Judge: " + project["judgename"] + " - Score: " + project["score"]}
                                        </div>
                                    </ul>
                                ))}
                                </div>
                            </Collapsible>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default WinnerPage;
