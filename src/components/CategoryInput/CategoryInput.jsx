import React, { Component } from 'react';
import AwardList from './AwardList';

import './CategoryInput.css';
import '../OrganizerPortal.css';

class CategoryInput extends Component {
  render() {
    return (
      <div className="page-background">
        <div className="page-header">
          <p>Judging Categories</p>
        </div>

        <div className="content-background">
          <div className ="category_lists">
            <AwardList listTitle="APIs" inputBackgroundText="+ Add API"/>
            <AwardList listTitle="General Categories" inputBackgroundText="+ Add Category"/>
            <AwardList listTitle="Fellowships" inputBackgroundText="+ Add Fellowship"/>
          </div>
          <button className="page-button">Next</button>
        </div>
      </div>
    );
  }
}

export default CategoryInput;
