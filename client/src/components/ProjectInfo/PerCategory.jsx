import React, { Component } from 'react';
import './PerCategory.css';

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
                        <input type="score"
                            keyboardType = "phone-pad"
                            className = "score-input"
                            placeholder = "+"
                            onChange={this.handleScore}
                        >
                        </input> :
                        <input type="score"
                            keyboardType = "phone-pad"
                            className = "score-input"
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
