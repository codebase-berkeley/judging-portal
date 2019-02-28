import React, { Component } from 'react';
import './DataEntry.css';

class DataEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      entries: [],
      input: ''
    };

    this.handleItem = this.handleItem.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  handleItem(event) {
    if (event.key === 'Enter') {
      this.setState({
        input: event.target.value
      });
    }
  }
  z;
  addItem(event) {
    if (this.state.input !== '') {
      this.setState({
        input: '',
        entries: this.state.entries.concat(this.state.input)
      });
    }
  }

  render() {
    return (
      <div className="view">
        <div className="pheader">
          <h1>Data Entry</h1>
        </div>
        <div className="box">
          <div className="c1">
            <div id="datatype">
              <h2>Number of Tables</h2>
            </div>
            <div className="inputbox">
              <input
                placeholder="Add Entry"
                value={this.state.input}
                onChange={this.handleItem}
                onKeyPress={this.addItem}
              />
            </div>
          </div>

          <div className="c2">
            <div id="datatype">
              <h2>Number of Clusters</h2>
            </div>
            <div className="inputbox">
              <input
                placeholder="Add Entry"
                value={this.state.input}
                onChange={this.handleItem}
                onKeyPress={this.addItem}
              />
            </div>
          </div>

          <div className="c3">
            <div id="datatype">
              <h2>Waves of Judges</h2>
            </div>
            <div className="inputbox">
              <input
                placeholder="Add Entry"
                value={this.state.input}
                onChange={this.handleItem}
                onKeyPress={this.addItem}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DataEntry;
