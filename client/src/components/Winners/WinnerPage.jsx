import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import './WinnerPage.css';
import ReactTable from "react-table";
import ReactBasicTable from 'react-basic-table';


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
        const columns = [{
            Header: 'Ranking',
            accessor: 'judgename'
        }, {
            Header: 'Project Name',
            accessor: 'projectname'
        }, {
            Header: 'Score',
            accessor: 'score'
        }]


        return (
            <div className="page-background" id="">
                <div className="page-header">WINNERS</div>
                <div className="content-background">
                    {Object.values(this.state.winners).map((categoryWinners, index) => (
                        <div>

                            <Collapsible
                                trigger={<div className="triggerHeader">
                                    {Object.keys(this.state.winners)[index]}
                                </div>}
                                transitionTime={100}>

                                <div className="winner-list">
                                    <ReactTable
                                        className="-striped -highlight"
                                        data={categoryWinners}
                                        style={{ height: "200px" }}
                                        columns={columns}
                                        defaultPageSize={5}
                                        showPageSizeOptions={false}
                                    />

                                    {/* <p>Name Judge Score</p>
                                {categoryWinners.map((project, i) => (
                                    <ul>
                                        <div>
                                            {i + 1 + ": " + project["projectname"] + " - " + project["judgename"] + " - " + project["score"]}
                                        </div>
                                    </ul>
                                ))} */}
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
