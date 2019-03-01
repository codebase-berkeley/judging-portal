import React, { Component } from 'react';
import './DataEntry.css';

class DataEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tablenum: '',
      clusternum: '',
      wavenum: ''
    };
    this.handleTable = this.handleTable.bind(this);
    this.handleCluster = this.handleCluster.bind(this);
    this.handleWave = this.handleWave.bind(this);
    this.saveVals = this.saveVals.bind(this);
  }

  handleTable(event) {
    this.setState({
      tablenum: event.target.value
    });
    if (event.key === 'Enter') {
      console.log(this.state.tablenum);
    }
  }

  handleCluster(event) {
    this.setState({
      clusternum: event.target.value
    });
    if (event.key === 'Enter') {
      console.log(this.state.clusternum);
    }
  }

  handleWave(event) {
    this.setState({
      wavenum: event.target.value
    });
    if (event.key === 'Enter') {
      console.log(this.state.wavenum);
    }
  }

  saveVals(event) {
    console.log(this.state.tablenum, this.state.clusternum, this.state.wavenum);
  }

  render() {
    return (
      <div className="view">
        <div className="pheader">
          <h1>Data Entry</h1>
        </div>
        <div className="box">
          <div className="c">
            <div id="datatype">
              <h2>Number of Tables</h2>
            </div>
            <div className="inputbox">
              <input placeholder="Add Entry" onKeyPress={this.handleTable} />
            </div>
          </div>

          <div className="c">
            <div id="datatype">
              <h2>Number of Clusters</h2>
            </div>
            <div className="inputbox">
              <input placeholder="Add Entry" onKeyPress={this.handleCluster} />
            </div>
          </div>

          <div className="c">
            <div id="datatype">
              <h2>Waves of Judges</h2>
            </div>
            <div className="inputbox">
              <input placeholder="Add Entry" onKeyPress={this.handleWave} />
            </div>
          </div>

          <div className="c">
            <div id="datatype">
              <h2>Upload Devpost</h2>
            </div>
            <button className="button">
              <div className="uploadbutton">Upload File</div>
            </button>
          </div>

          <button className="button" onClick={this.saveVals}>
            Prev
          </button>

          <button className="button" onClick={this.saveVals}>
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default DataEntry;
