import React, { Component } from 'react';
import AwardList from './AwardList.jsx';

import './CategoryInput.css';

class CategoryInput extends Component {
  render() {
    return (
      <div id="CategoryInputPage">
        <div id="title">
          <h>Judging Categories</h>
        </div>

        <div id="body">
        <AwardList listTitle="APIs" inputBackgroundText="+ Add API"/>
        <AwardList listTitle="General Categories" inputBackgroundText="+ Add Category"/>
        <AwardList listTitle="Fellowships" inputBackgroundText="+ Add Fellowship"/>

          <button id="next">Next</button>
        </div>
      </div>
    );
  }
}

export default CategoryInput;
