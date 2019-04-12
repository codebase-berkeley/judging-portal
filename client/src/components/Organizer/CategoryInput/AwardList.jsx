import React, { Component } from 'react';
import ListItem from './ListItem';
import '../OrganizerPortal.css';

class AwardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAward: "",
    };
    this.inputChange = this.inputChange.bind(this);
    this.addToList = this.addToList.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  removeItem(index) {
    this.props.delItem(index);
  }

  inputChange(event) {
    this.setState({
      currentAward: event.target.value
    })
  }

  addToList(event) {
    if (event.key === 'Enter') {
      if (this.state.curr_item !== "") {
        this.props.addItem(this.state.currentAward)
        this.setState({
          currentAward: "",
        })
      }
    }
  }

  render() {
    let list = [];
    if (this.props.list) {
      list = Object(this.props.list);
    } 


    return (
      <div className="award-list">
        <div className="award-list-name">
          {this.props.listTitle}
        </div>
        <div className="award-list-field">
          <input className="award-list-input" placeholder={this.props.inputBackgroundText} value={this.state.currentAward} onChange={this.inputChange} onKeyPress={this.addToList}></input>
        </div>
        <ol className="list award">
          {list.map((item, index) => (
            <div className="award-list-element ">
              <ListItem text={item} />
              <div role="button" tabIndex={0} className="delete-button" onClick={() => this.removeItem(index)} onKeyDown={() => this.removeItem(index)}>
                ×
              </div>
              
            </div>
          ))}
        </ol>
      </div>
    );
  }
}

export default AwardList;
