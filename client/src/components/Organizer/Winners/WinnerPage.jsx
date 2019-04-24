import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import WinnerCategory from './WinnerCategory';

import '../OrganizerPortal.css';


class WinnerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            winners: {},
            collapsibleCategories: []
        }
        this.getWinners = this.getWinners.bind(this);
    }

    async componentDidMount() {
        const winner = await this.getWinners();
        
        const allCategories = [];
        var i;
        const numCategories = Object.keys(winner).length;
        for (i = 0; i < numCategories; i ++) {
            const currCatName = Object.keys(winner)[i];
            const currCatWinners = winner[currCatName];
            allCategories.push(
                <Collapsible trigger = {<div className="triggerHeader"> {currCatName} <button type="button" className="dropdown-button">
                <div className="dropdown-button-shape"></div>
            </button></div>} transitionTime={100}> 
                <WinnerCategory category = {currCatName} projects = {currCatWinners}/>
                </Collapsible>
            );
            console.log(allCategories);

        }
        await this.setState({
            winners: winner,
            collapsibleCategories: allCategories
        })
        console.log(this.state.collapsibleCategories);
    }

    async getWinners() {
        const res = await fetch('/api/winners');
        const resJson = res.json();
        return resJson;
    }

    render() {
        // const columns = [{
        //     Header: 'Ranking',
        //     accessor: 'judgename'
        // }, {
        //     Header: 'Project Name',
        //     accessor: 'projectname'
        // }, {
        //     Header: 'Score',
        //     accessor: 'score'
        // }]


        return (
            <div className="page-background" id="">
                <div className="page-header">WINNERS</div>
                <div className="w-content-background">
                {this.state.collapsibleCategories}
                    {/* {Object.values(this.state.winners).map((categoryWinners, index) => (
                        <div>
                            <Collapsible
                                trigger={<div className="triggerHeader">
                                    {Object.keys(this.state.winners)[index]}
                                </div>}
                                transitionTime={100}>

                                <div className="winner-list">
                                    
                                </div>
                            </Collapsible>
                        </div>
                    ))} */}
                </div>
            </div>
        );
    }
}

export default WinnerPage;
