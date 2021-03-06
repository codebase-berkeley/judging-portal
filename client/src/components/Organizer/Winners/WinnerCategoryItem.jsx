import React, { Component } from 'react';

class WinnerCategoryItem extends Component {
    render() {
        return (
            <div className="w-proj-item">
                <div className="w-project-name">{this.props.rank}</div>
                <div className="w-project-name">{this.props.name}</div>
                <div className="w-project-name">{this.props.score}</div>
                <div className="w-project-name">{this.props.judge}</div>
            </div>
        );
    }
}

export default WinnerCategoryItem;
