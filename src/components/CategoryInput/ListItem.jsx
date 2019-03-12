import React, {Component} from "react";
import './ListItem.css';

class ListItem extends Component {

    render() {
        return (
            <div className="ListItem">
              <li>{this.props.text}</li>
            </div>
        );
    }
}

export default ListItem;
