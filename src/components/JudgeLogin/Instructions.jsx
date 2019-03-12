import React, { Component } from 'react';
import './Instructions.css';

const instructions = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

class Instructions extends Component {

    constructor(props) {
        super(props);

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
                    <button className="instructions-next">Got it!</button>
                </div>
            </div>
        )
    }
}

export default Instructions;