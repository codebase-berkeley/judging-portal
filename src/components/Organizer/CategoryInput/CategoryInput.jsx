import React, { Component } from 'react';
import '../OrganizerPortal.css';
import AwardList from './AwardList';

class CategoryInput extends Component {
  constructor(props) {
    super(props);
    this.routeToNext = this.routeToNext.bind(this);
  }

  routeToNext() {
    let path = "/data-entry";
    this.props.history.push(path);
  }

  render() {
    return (
      <div className="page-background" id="CategoryInput">
        <div className="page-header">
          JUDGING CATEGORIES
        </div>

        <div className="content-background">
          <div className ="category-lists">
            <AwardList listTitle="APIS" inputBackgroundText="+ Add API"/>
            <AwardList listTitle="GENERAL CATEGORIES" inputBackgroundText="+ Add Category"/>
            <AwardList listTitle="FELLOWSHIPS" inputBackgroundText="+ Add Fellowship"/>
          </div>
          <button className="button nav" onClick={this.routeToNext}>NEXT</button>
        </div>
      </div>
    );
  }
}

export default CategoryInput;
