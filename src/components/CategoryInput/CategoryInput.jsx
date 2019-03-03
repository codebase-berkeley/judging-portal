import React, { Component } from 'react';
import AwardList from './AwardList';

import './CategoryInput.css';

class CategoryInput extends Component {
  render() {
    return (
      <div className="categoryInputPage">
        <div id="title">
          <h>Judging Categories</h>
        </div>

        <div id="category_body">
          <div id ="category_lists">
            <AwardList listTitle="APIs" inputBackgroundText="+ Add API"/>
            <AwardList listTitle="General Categories" inputBackgroundText="+ Add Category"/>
            <AwardList listTitle="Fellowships" inputBackgroundText="+ Add Fellowship"/>
          </div>
          <button className="next_button">Next</button>
        </div>
      </div>
    );
  }
}

export default CategoryInput;
