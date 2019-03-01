import React, { Component } from 'react';
import './CategoryInput.css';
import Button from '@material-ui/core/Button';

class CategoryInput extends Component {
  render() {
    return (
      <div id="CategoryInputPage">
        <div id="title">
          <h>Judging Categories</h>
        </div>

        <div id="body">
          <button id="next">Next</button>
        </div>
      </div>
    );
  }
}

export default CategoryInput;
