import React, { Component } from 'react';
import './AwardList.css';
import ListItem from './ListItem';

class AwardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentAward: "",
        awardsList: []
    };
    this.inputChange = this.inputChange.bind(this);
    this.addToList = this.addToList.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
  }

  removeTodo(event) {
    this.setState({
      awardsList: this.state.awardsList.filter(item => item !== event)
    })
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
        <div className="awardList">
            <div className="">
                <h1 className = "list-name"> {this.props.listTitle}</h1>
            </div>
            <div className="input-field">
                <input id="list-input" placeholder={this.props.inputBackgroundText} value={this.state.currentAward} onChange={this.inputChange} onKeyPress={this.addToList}></input>
            </div>
            <ol className="list-content">
                {this.state.awardsList.map((item, index) => (
                    <ListItem key={index} text={item} removeTodo={this.removeTodo}/>
                ))}
            </ol>
        </div>
    );
  }
}

export default AwardList;
