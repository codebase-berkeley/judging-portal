import React, { Component } from 'react';
import '../JudgePortal.css';

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
                    <div className="instructions-text">
                        <p className="instruction">All projects can receive a score between 1 through 5</p>
                        <p className="instruction">Once a project has received a score for all its respective categories, it will be marked as scored</p>
                        <p className="instruction">Project scores can be changed even after it has been sorted as scored</p>
                        <p className="instruction">Please score all projects</p>
                    </div>
                    <button className="instructions-next" type="submit" onClick={this.routeToNext}>GOT IT!</button>
                </div>
            </div>
        )
    }
}

export default Instructions;
