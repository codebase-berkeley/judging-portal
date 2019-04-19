import React, { Component } from 'react';
import '../OrganizerPortal.css';
import AwardList from './AwardList';

class CategoryInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apis: [],
      general_categories: [],
      fellowships: [],
      deleted: [],
      added: []
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
      const apiData = [];
      const categoryData = [];
      const fellowshipData = [];
      for (i = 0; i < result.length; i += 1) { 
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
    const res = await fetch('/api/lists');
    const resJson = res.json();
    return resJson
  }

  routeToNext() {
    this.postLists();
    const path = "/data-entry";
    this.props.history.push(path);
  }

  addAPI(api) {
    this.setState((prevState) => {
      return {
        apis: prevState.apis.concat(api),
        added: prevState.added.concat([['api', api]])
      }
    });
  }

  addCategory(category) {
    this.setState((prevState) => {
      return {
        general_categories: prevState.general_categories.concat(category),
        added: prevState.added.concat([['general', category]])
      }
    });
  }

  addFellowship(fellowship) {
    this.setState((prevState) => {
      return {
        fellowships: prevState.fellowships.concat(fellowship),
        added: prevState.added.concat([['fellowships', fellowship]])
      }
    });
  }

  removeAPIItem(index) {
    this.setState((prevState) => {
      const awards = prevState.apis.slice();
      const item = awards[index];
      awards.splice(index, 1);
      return {
        apis: awards,
        deleted: prevState.deleted.concat([['api', item]])
      }
    });
  }

  removeCategoryItem(index) {
    this.setState((prevState) => {
      const awards = prevState.general_categories.slice()
      const item = awards[index];

      awards.splice(index, 1)
      return {
        general_categories: awards,
        deleted: prevState.deleted.concat([['general', item]])
      } 
    });
  }

  removeFellowshipItem(index) {
    this.setState((prevState) => {
      const awards = prevState.fellowships.slice();
      const item = awards[index];
      awards.splice(index, 1);
      return {
        fellowships: awards,
        deleted: prevState.deleted.concat([['fellowships', item]])
      }
    });
  }

  async postLists() {
    const res = await window.fetch('/api/lists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        deleted: this.state.deleted,
        added: this.state.added
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
