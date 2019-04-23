import React, { Component } from 'react';
import './PerCategory.css';

class PerCategory extends Component {
    render() {
        return(
            <div className = "category-score">
                <div className="t-category">{this.props.category}</div>
                <div className="t-score">
                    {this.props.location.state.score === null ? 
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
                            placeholder = {this.props.location.state.score}
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

