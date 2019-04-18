import React, { Component } from 'react';
import './Instructions.css';

const instructions = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

class Instructions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            judgeId: ''
        }
        this.routeToNext = this.routeToNext.bind(this);
    }

    componentDidMount() {
        this.setState({
            judgeId: this.props.location.state.judgeId
        })
    }

    routeToNext() {
        this.props.history.push({
            pathname: '/overview',
            state: {
                judgeId: this.state.judgeId
            }
        })
    }

    render() {
        return (
            <div className="instructions">
                <div className = "instructions-content"> 
                    <header className="instructions-title">
                        INSTRUCTIONS
                    </header>
                    <p className="instructions-text">
                        {instructions}
                    </p>
                    <button className="instructions-next" type="submit" onClick={this.routeToNext}>Got it!</button>
                </div>
            </div>
        )
    }
}

export default Instructions;