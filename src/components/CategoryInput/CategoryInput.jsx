import React, { Component } from 'react';
import AwardList from './AwardList';

import './CategoryInput.css';

class CategoryInput extends Component {
  render() {
    return (
      <div id="CategoryInputPage">
        <div id="title">
          <h>Judging Categories</h>
        </div>

        <div id="body">
        <div id ="lists">
        <AwardList listTitle="APIs" inputBackgroundText="+ Add API"/>
        <AwardList listTitle="General Categories" inputBackgroundText="+ Add Category"/>
        <AwardList listTitle="Fellowships" inputBackgroundText="+ Add Fellowship"/>
        </div>
          <button id="next">Next</button>
        </div>
      </div>
    );
  }
}

export default CategoryInput;
