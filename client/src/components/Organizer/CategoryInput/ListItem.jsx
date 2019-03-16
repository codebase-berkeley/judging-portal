import React, {Component} from "react";
import '../OrganizerPortal.css';

class ListItem extends Component {

    render() {
        return (
            <div className="award-list-item">
              <li>{this.props.text}</li>
            </div>
        );
    }
}

export default ListItem;
