import React, { Component } from 'react';
import ListItem from './ListItem';
import '../OrganizerPortal.css';

class AwardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentAward: "",
        awardsList: []
    };
    this.inputChange = this.inputChange.bind(this);
    this.addToList = this.addToList.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  removeItem(index) {
    let awards = this.state.awardsList.slice();
    awards.splice(index, 1);
    this.setState({
      awardsList: awards
    });
  }

  inputChange(event) {
    this.setState({
        currentAward: event.target.value
    })
  }

  addToList(event) {
    if (event.key == 'Enter') {
        if (this.state.curr_item !== "") {
            this.setState({
                currentAward: "",
                awardsList: this.state.awardsList.concat(this.state.currentAward)
            })
            console.log("successfully added");
        }
    }
  }

  render() {
    return (
        <div className="award-list">
            <div className="award-list-name">
              {this.props.listTitle}
            </div>
            <div className="award-list-field">
                <input className="award-list-input" placeholder={this.props.inputBackgroundText} value={this.state.currentAward} onChange={this.inputChange} onKeyPress={this.addToList}></input>
            </div>
            <ol className="list award">
                {this.state.awardsList.map((item, index) => (
                  <div className="award-list-element ">
                    <ListItem key={index} text={item}/>
                    <div className="delete-button" onClick={() => this.removeItem(index)}>
                      x
                    </div>
                  </div>
                ))}
            </ol>
        </div>
    );
  }
}

export default AwardList;
