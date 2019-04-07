import React, { Component } from 'react';
import ListItem from './ListItem';
import '../OrganizerPortal.css';

class AwardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentAward: "",
        APIData: {},
        awardsList: this.props.list
    };
    this.inputChange = this.inputChange.bind(this);
    this.addToList = this.addToList.bind(this);
    this.removeItem = this.removeItem.bind(this);
    // this.postItem = this.postItem.bind(this);
  }

  // async getLists() {
  //   const res = await fetch('/api/lists');
  //   const res_json = await res.json();
  //   this.setState({
  //     awardsList: res_json.apis
  //   });
  // }

  // componentDidMount() {
  //   console.log(this.props.list)
  //   this.setState({
  //     awardsList: this.props.list
  //   });
  // }

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
          this.props.addItem(this.state.currentAward)
          this.setState({
            currentAward: "",
            awardsList: this.state.awardsList.concat(this.state.currentAward)
          })
        }
    }
  }

  // async postAPIValue(){
  //   console.log("entered posting method");
  //   let res = await fetch('/api/apis', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       APIList: this.state.awardsList
  //     })
  //   });
  //   let res_json = res.json();
  //   return res_json;
  // }

  // async postCategoriesValue(){
  //   let res = await fetch('/api/general_categories', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       general_categories: this.state.awardsList
  //     })
  //   });
  //   let res_json = res.json();
  //   return res_json;
  // }

  // async postFellowshipsValue(){
  //   let res = await fetch('/api/fellowships', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       fellowships: this.state.fellowships
  //     })
  //   });
  //   let res_json = res.json();
  //   return res_json;
  // }

  // async postItem() {
  //   let listName = this.props.listTitle;
  //   if (listName === "APIS") {
  //     console.log("posting API Value");
  //     await this.postAPIValue();
  //   } else if (listName === "GENERAL CATEGORIES") {
  //     await this.postCategoriesValue();
  //   } else if (listName === "FELLOWSHIPS") {
  //     await this.postFellowshipsValue();
  //   }
  // }

  render() {
    console.log("inside awardlist component: " + this.state.awardsList);
    return (
        <div className="award-list">
            <div className="award-list-name">
              {this.props.listTitle}
            </div>
            <div className="award-list-field">
                <input className="award-list-input" placeholder={this.props.inputBackgroundText} value={this.state.currentAward} onChange={this.inputChange} onKeyPress={this.addToList}></input>
            </div>
            <ol className="list award">
                {this.props.list.map((item, index) => (
                  <div className="award-list-element ">
                    <ListItem key={index} text={item}/>
                    <div className="delete-button" onClick={() => this.removeItem(index)}>
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
