import React, { Component } from 'react';
import '../OrganizerPortal.css';
import AwardList from './AwardList';

class CategoryInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apis: [],
      categories: [],
      fellowships: []
    };
    this.routeToNext = this.routeToNext.bind(this);
    this.addAPI = this.addAPI.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.addFellowship = this.addFellowship.bind(this);
  }

  routeToNext() {
    this.postLists();
    let path = "/data-entry";
    this.props.history.push(path);
  }

  async componentDidMount() {
    const res = await fetch('/api/lists');
    const res_json = await res.json();
    await this.setState({
      apis: res_json.apis,
      categories: res_json.categories,
      fellowships: res_json.fellowships
    });
  }

  addAPI(api) {
    this.setState({
      apis: this.state.apis.concat(api)
    });
  }

  addCategory(category) {
    this.setState({
      categories: this.state.categories.concat(category)
    });
  }

  addFellowship(fellowship) {
    this.setState({
      categories: this.state.fellowships.concat(fellowship)
    });
  }

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

  async postLists() {
      console.log("entered posting method");
      let res = await fetch('/api/lists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          apis: this.state.apis,
          categories: this.state.categories,
          fellowships: this.state.fellowships
        })
      });
      let res_json = res.json();
      return res_json;
  }

  render() {
    return (
      <div className="page-background" id="CategoryInput">
        <div className="page-header">
          JUDGING CATEGORIES
        </div>
        {console.log("API: " + this.state.apis)}
        <div className="content-background">
          <div className ="category-lists">
            <AwardList listTitle="APIS" inputBackgroundText="+ Add API" list={this.state.apis} addItem={this.addAPI}/>
            <AwardList listTitle="GENERAL CATEGORIES" inputBackgroundText="+ Add Category" list={this.state.categories} addItem={this.addCategory}/>
            <AwardList listTitle="FELLOWSHIPS" inputBackgroundText="+ Add Fellowship" list={this.state.fellowships} addItem={this.addFellowship}/>
          </div>
          <button className="button nav category-button" onClick={this.routeToNext}>NEXT</button>
        </div>
      </div>
    );
  }
}

export default CategoryInput;
