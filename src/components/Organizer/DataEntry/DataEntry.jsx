import React, { Component } from 'react';
import '../OrganizerPortal.css';


class DataEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tableNum: '',
      clusterNum: '',
      waveNum: '',
      fileName: 'UPLOAD FILE'
    };
    this.handleTable = this.handleTable.bind(this);
    this.handleCluster = this.handleCluster.bind(this);
    this.handleWave = this.handleWave.bind(this);
    this.saveVals = this.saveVals.bind(this);
    this.changeFileName = this.changeFileName.bind(this);
  }

  handleTable(event) {
    this.setState({
      tableNum: event.target.value
    });
    if (event.key === 'Enter') {
      console.log(event.target.value);
    }
  }

  handleCluster(event) {
    this.setState({
      clusterNum: event.target.value
    });
    if (event.key === 'Enter') {
      console.log(this.state.clusterNum);
    }
  }

  handleWave(event) {
    this.setState({
      wavenum: event.target.value
    });
    if (event.key === 'Enter') {
      console.log(this.state.waveNum);
    }
  }

  saveVals(event) {
    console.log(this.state.tableNum, this.state.clusterNum, this.state.waveNum);
  }

  changeFileName(event) {
    let input = event.target.value;
    let fileName = input.replace(/^.*[\\\/]/, '');
    if (fileName == '') {
      fileName = 'UPLOAD FILE';
    }
    this.setState({
      fileName: fileName
    })
  }

  render() {
    return (
      <div className="page-background" id ="DataEntry">
        <div className="page-header">
          DATA ENTRY
        </div>

        <div className="content-background">
          <div className="data-entry-contents">
            <div className="data-entry-element">
              <div className="data-element-title">NUMBER OF TABLES</div>
              <input
                placeholder="Add Entry"
                onKeyPress={this.handleTable}
                className="data-entry-input"
              />
            </div>

            <div className="data-entry-element">
              <div className="data-element-title">NUMBER OF CLUSTERS</div>
              <input
                placeholder="Add Entry"
                onKeyPress={this.handleCluster}
                className="data-entry-input"
              />
            </div>

            <div className="data-entry-element">
              <div className="data-element-title">WAVES OF JUDGES</div>
              <input
                placeholder="Add Entry"
                onKeyPress={this.handleWave}
                className="data-entry-input"
              />
            </div>

            <div className="data-entry-element">
              <div className="data-element-title">UPLOAD DEVPOST</div>
              <input type="file" id="og-file" className="upload-file" onChange={this.changeFileName}/>
              <label for="og-file">{this.state.fileName}</label>
            </div>

            <div className="nav">
              <button className="button" onClick={this.saveVals}>PREV</button>
              <button className="button" onClick={this.saveVals}>NEXT</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DataEntry;
