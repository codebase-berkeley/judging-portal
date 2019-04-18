import React, { Component } from 'react';
import '../OrganizerPortal.css';

var Papa = require('papaparse');

class DataEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tableNum: '',
      clusterNum: '',
      waveNum: '',
      fileName: 'UPLOAD FILE',
      fileReader: null,
      jsonfile: null,
    };
    this.handleTable = this.handleTable.bind(this);
    this.handleCluster = this.handleCluster.bind(this);
    this.handleWave = this.handleWave.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleFileRead = this.handleFileRead.bind(this);
    this.readFile = this.readFile.bind(this);
    this.changeFileName = this.changeFileName.bind(this);
    this.routeToPrev = this.routeToPrev.bind(this);
    this.routeToNext = this.routeToNext.bind(this);
  }

  handleTable(event) {
    this.setState({
      tableNum: event.target.value
    });
  }

  handleCluster(event) {
    this.setState({
      clusterNum: event.target.value
    });
  }

  handleWave(event) {
    this.setState({
      waveNum: event.target.value
    });
  }

  handleFileUpload(event) {
    this.changeFileName(event);
    this.handleFileRead(event.target.files[0]);
  }

  handleFileRead(file) {
    let fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onloadend = this.readFile(fileReader);
    this.setState({
      fileReader: fileReader
    })
  }

  readFile(fileReader) {
    this.setState({
      file: fileReader.result
    });
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

  componentDidMount() {
    this.getDataEntry().then(result => {
      if (result.length == 0) {
        this.setState({
          tableNum: '',
          clusterNum: '',
          waveNum: '',
          fileName: 'UPLOAD FILE'
        })
      } else {
          this.setState({
            tableNum: result[0].tables,
            clusterNum: result[0].clusters,
            waveNum: result[0].waves,
            fileName: result[0].filename
          })
      }
    });
  }

  async getDataEntry() {
    let res = await fetch('/api/data');
    let res_json = res.json();
    return res_json
  }

  async postData() {
    let res = await fetch('/api/data', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tables: this.state.tableNum,
        clusters: this.state.clusterNum,
        waves: this.state.waveNum,
        filename: this.state.fileName
      })
    });
    let res_json = res.json();
    return res_json;
  }

  async postCSV() {
    var results = Papa.parse(this.state.fileReader.result);

    var list = [];

    for (let i = 1; i < results.data.length; i++) {
      var dict = {};
      for (let n = 0; n < results.data[0].length; n++) {
        dict[results.data[0][n]] = results.data[i][n]
      }
      list[i] = dict;
    }

    console.log(list);

    let res = await fetch('/api/data', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        projects: list
      })
    });
    let res_json = res.json();
    return res_json;
  }

  routeToPrev() {
    this.postCSV().then(result => console.log(result));
    this.postData().then(result => console.log(result));
    this.props.history.push("/categories");
  }

  routeToNext() {
    this.postCSV().then(result => console.log(result));
    this.postData().then(result => console.log(result));
    this.props.history.push("/judge-info");
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
                onChange={this.handleTable}
                className="data-entry-input"
                value={this.state.tableNum}
              />
            </div>

            <div className="data-entry-element">
              <div className="data-element-title">NUMBER OF CLUSTERS</div>
              <input
                placeholder="Add Entry"
                onChange={this.handleCluster}
                className="data-entry-input"
                value={this.state.clusterNum}
              />
            </div>

            <div className="data-entry-element">
              <div className="data-element-title">WAVES OF JUDGES</div>
              <input
                placeholder="Add Entry"
                onChange={this.handleWave}
                className="data-entry-input"
                value={this.state.waveNum}
              />
            </div>

            <div className="data-entry-element">
              <div className="data-element-title">UPLOAD DEVPOST</div>
              <input
                type="file"
                id="og-file"
                onChange={this.handleFileUpload}
                className="upload-file"
              />
              <label for="og-file">{this.state.fileName}</label>
            </div>

            <div className="data-button nav">
              <button className="button" onClick={this.routeToPrev}>PREV</button>
              <button className="button" onClick={this.routeToNext}>NEXT</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DataEntry;
