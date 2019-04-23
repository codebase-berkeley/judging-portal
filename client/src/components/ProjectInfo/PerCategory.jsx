import React, { Component } from 'react';

class PerCategory extends Component {
    constructor(props) {
        super(props);
        this.handleScore = this.handleScore.bind(this)
    }

    handleScore(event) {
       this.props.changeScore(this.props.category, event.target.value);
    }

    render() {
        return(
            <div className = "category-score">
                <div className="t-category">{this.props.category}</div>
                <div className="t-score">
                    {this.props.score === null ? 
                        <input
                            keyboardType = "phone-pad"
                            className = "scoreInput" 
                            placeholder = "Add score"
                            onChange={this.handleScore}
                        >
                        </input> : 
                        <input
                            keyboardType = "phone-pad"
                            className = "scoreInput" 
                            placeholder = {this.props.score}
                            onChange={this.handleScore}
                        >
                        </input>
                    }
                </div>
            </div>
        );
    }
}

export default PerCategory;

