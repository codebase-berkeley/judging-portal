import React, { Component } from 'react';
import '../OrganizerPortal.css';
import AwardList from './AwardList';

class CategoryInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apis: [],
      general_categories: [],
      fellowships: []
    };
    this.routeToNext = this.routeToNext.bind(this);
    this.addAPI = this.addAPI.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.addFellowship = this.addFellowship.bind(this);
    this.removeCategoryItem = this.removeCategoryItem.bind(this);
    this.removeAPIItem = this.removeAPIItem.bind(this);
    this.removeFellowshipItem = this.removeFellowshipItem.bind(this);
  }

  componentDidMount() {
    this.getLists().then(result => {
      let i;
      let apiData = [];
      let categoryData = [];
      let fellowshipData = [];
      for (i = 0; i < result.length; i++) { 
        if (result[i].api) {
          apiData.push(result[i].api);
        } else if (result[i].fellowships) {
          fellowshipData.push(result[i].fellowships);
        } else if (result[i].general) {
          categoryData.push(result[i].general);
        }
      }
      this.setState({
        apis: apiData,
        general_categories: categoryData,
        fellowships: fellowshipData
      });
    });
  }

  async getLists() {
    let res = await fetch('/api/lists');
    let res_json = res.json();
    return res_json
  }

  routeToNext() {
    this.postLists();
    const path = "/data-entry";
    this.props.history.push(path);
  }

  addAPI(api) {
    this.setState((prevState) => {
      return {apis: prevState.apis.concat(api)}
    });
  }

  addCategory(category) {
    this.setState((prevState) => {
      return {general_categories: prevState.general_categories.concat(category)}
    });
  }

  addFellowship(fellowship) {
    this.setState((prevState) => {
      return {fellowships: prevState.fellowships.concat(fellowship)}
    });
  }

  removeAPIItem(index) {
    this.setState((prevState) => {
      const awards = prevState.apis.slice();
      awards.splice(index, 1);
      return {apis: awards}
    });
  }

  removeCategoryItem(index) {
    this.setState((prevState) => {
      const awards = prevState.general_categories.slice()
      awards.splice(index, 1)
      return {general_categories: awards} 
    });
  }

  removeFellowshipItem(index) {
    this.setState((prevState) => {
      const awards = prevState.fellowships.slice();
      awards.splice(index, 1);
      return {fellowships: awards}
    });
  }

  async postLists() {
    const res = await window.fetch('/api/lists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        apis: this.state.apis,
        general_categories: this.state.general_categories,
        fellowships: this.state.fellowships
      })
    });
    const resJson = res.json();
    return resJson;
  }

  render() {
    return (
      <div className="page-background" id="CategoryInput">
        <div className="page-header">
          JUDGING CATEGORIES
        </div>
        <div className="content-background">
          <div className="category-lists">
            <AwardList listTitle="APIS" inputBackgroundText="+ Add API" list={this.state.apis} addItem={this.addAPI} delItem={this.removeAPIItem} />
            <AwardList listTitle="GENERAL CATEGORIES" inputBackgroundText="+ Add Category" list={this.state.general_categories} addItem={this.addCategory} delItem={this.removeCategoryItem} />
            <AwardList listTitle="FELLOWSHIPS" inputBackgroundText="+ Add Fellowship" list={this.state.fellowships} addItem={this.addFellowship} delItem={this.removeFellowshipItem} />
          </div>
          <button type="submit" className="button nav category-button" onClick={this.routeToNext}>NEXT</button>
        </div>
      </div>
    );
  }
}

export default CategoryInput;
