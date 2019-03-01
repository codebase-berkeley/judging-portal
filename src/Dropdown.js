/* eslint-disable */

import React, { Component } from 'react';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
      headerTitle: this.props.title
    };
  }

  selectItem = (title, id, stateKey) => {
    this.setState(
      {
        headerTitle: title,
        listOpen: false
      },
      this.props.resetThenSet(id, stateKey)
    );
  };

  toggleList = () => {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }));
  };

  handleClickOutside() {
    this.setState({
      listOpen: false
    });
  }

  render() {
    const { list } = this.props;
    const { listOpen, headerTitle } = this.state;
    return (
      <div className="dd-container">
        <div
          className="dd-header"
          role="heading"
          onClick={() => this.toggleList()}
          onKeyDown={() => this.toggleList()}
        >
          <div className="dd-header-title">{headerTitle}</div>
          {listOpen}
        </div>
        {listOpen && (
          <ul
            className="dd-list"
            onClick={e => e.stopPropagation()}
            onKeyDown={e => e.stopPropagation()}
          >
            {list.map(item => (
              <li
                className="dd-list-item"
                key={item.id}
                onClick={() => this.selectItem(item.title, item.id, item.key)}
                onKeyDown={() => this.selectItem(item.title, item.id, item.key)}
              >
                {item.title} {item.selected}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default Dropdown;
