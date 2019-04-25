import React, { Component } from 'react';
import WinnerCollapsible from './WinnerCollapsible';
import '../OrganizerPortal.css';

class WinnerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            winners: {},
            dropdownButtons: []
        }
        this.getWinners = this.getWinners.bind(this);
        this.flipButtonUp = this.flipButtonUp.bind(this);
        this.flipButtonDown = this.flipButtonDown.bind(this);
    }

    async componentDidMount() {
        const winner = await this.getWinners();
        const buttons = [];
        const numCategories = Object.keys(winner).length;
        for (let i = 0; i < numCategories; i += 1) {
            buttons.push(
                <button type="button" className="dropdown-button">
                    <div className="dropdown-button-shape-down"></div> </button>
            );
        }
        await this.setState({
            winners: winner,
            dropdownButtons: buttons
        });
    }

    async getWinners() {
        const res = await fetch('/api/winners');
        const resJson = res.json();
        return resJson;
    }

    async flipButtonUp(i) {
        await this.setState((prevState) => {
            const newButtons = prevState.dropdownButtons;
            newButtons[i] = <button type="button" className="dropdown-button">
                <div className="dropdown-button-shape-up"></div> </button>
            return {
                dropdownButtons: newButtons
            }
        });
    }

    async flipButtonDown(i) {
        await this.setState((prevState) => {
            const newButtons = prevState.dropdownButtons;
            newButtons[i] = <button type="button" className="dropdown-button">
                <div className="dropdown-button-shape-down"></div> </button>
            return {
                dropdownButtons: newButtons
            }
        });
    }

    render() {
        const winner = this.state.winners;
        const allCategories = [];
        const numCategories = Object.keys(winner).length;
        for (let i = 0; i < numCategories; i += 1) {
            const currCatName = Object.keys(winner)[i];
            const currCatWinners = winner[currCatName];
            allCategories.push(
                <WinnerCollapsible
                    index={i}
                    flipButtonUp={this.flipButtonUp}
                    flipButtonDown={this.flipButtonDown}
                    name={currCatName}
                    button={this.state.dropdownButtons[i]}
                    winners={currCatWinners}
                />
            );
        }
        return (
            <div className="page-background" id="">
                <div className="page-header">WINNERS</div>
                <div className="w-content-background">
                    <div className="all-collapsible-categories">
                        { allCategories }
                    </div>
                </div>
            </div>
        );
    }
}

export default WinnerPage;
