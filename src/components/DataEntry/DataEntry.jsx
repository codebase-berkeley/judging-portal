import React, { Component } from 'react';
import './DataEntry.css';


class DataEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tableNum: '',
      clusterNum: '',
      waveNum: '',
      fileName: 'Upload File'
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
    this.setState({
      fileName: fileName
    })
  }

  render() {
    return (
      <div className="view">
        <div className="pheader">
          <h1>Data Entry</h1>
        </div>
        <div className="box">
          <div className="c">
            <div className="datatype">
              <h2>Number of Tables</h2>
            </div>
            <input
              placeholder="Add Entry"
              onKeyPress={this.handleTable}
              className="input-box "
            />
          </div>

          <div className="c">
            <div className="datatype">
              <h2>Number of Clusters</h2>
            </div>
            <input
              placeholder="Add Entry"
              onKeyPress={this.handleCluster}
              className="input-box"
            />
          </div>

          <div className="c">
            <div className="datatype">
              <h2>Waves of Judges</h2>
            </div>
            <input
              placeholder="Add Entry"
              onKeyPress={this.handleWave}
              className="input-box"
            />
          </div>

          <div className="c">
            <div className="datatype">
              <h2>Upload Devpost</h2>
            </div>
            <input type="file" id="og-file" className="upload-file" onChange={this.changeFileName}/>
            <label for="og-file">{this.state.fileName}</label>
          </div>

          <div className="submit-button-box">
            <button className="button" onClick={this.saveVals}>
              <div className="submit-button">Prev</div>
            </button>

            <button className="button" onClick={this.saveVals}>
              <div className="submit-button">Next</div>
            </button>
          </div>

        </div>
      </div>
    );
  }
}

export default DataEntry;
