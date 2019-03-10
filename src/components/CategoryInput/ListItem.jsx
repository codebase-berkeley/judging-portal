import React, {Component} from "react";
import './ListItem.css';

class ListItem extends Component {
    // removeItem(event) {
    //   this.props.removeTodo(event);
    // }
    render() {
        return (
            <div className="ListItem">
              <li>{this.props.text}</li>
            </div>
        );
    }
}

export default ListItem;
