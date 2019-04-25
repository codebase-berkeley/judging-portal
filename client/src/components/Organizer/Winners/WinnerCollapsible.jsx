import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import WinnerCategory from './WinnerCategory';

class WinnerCollapsible extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.flipButtonUp = this.flipButtonUp.bind(this);
        this.flipButtonDown = this.flipButtonDown.bind(this);
    }

    flipButtonUp() {
        this.props.flipButtonUp(this.props.index)
    }

    flipButtonDown() {
        this.props.flipButtonDown(this.props.index)
    }

    render() {
        return (
            <Collapsible
                onOpen={this.flipButtonUp}
                onClose={this.flipButtonDown}
                trigger={<div className="triggerHeader"> {this.props.name} {this.props.button}</div>}
                transitionTime={100}
            >
                <WinnerCategory category={this.props.name} projects={this.props.winners} />
            </Collapsible>
        );
    }
}

export default WinnerCollapsible;
