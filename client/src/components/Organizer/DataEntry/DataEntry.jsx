import React, { Component } from 'react';
import '../OrganizerPortal.css';

const Papa = require('papaparse');

class DataEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tableNum: '',
      clusterNum: '',
      waveNum: '',
      fileName: 'UPLOAD FILE',
      fileReader: null
    };
    this.handleTable = this.handleTable.bind(this);
    this.handleCluster = this.handleCluster.bind(this);
    this.handleWave = this.handleWave.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleFileRead = this.handleFileRead.bind(this);
    // this.readFile = this.readFile.bind(this);
    this.changeFileName = this.changeFileName.bind(this);
    this.routeToPrev = this.routeToPrev.bind(this);
    this.routeToNext = this.routeToNext.bind(this);
  }

  componentDidMount() {
    this.getDataEntry().then(result => {
      if (result.length === 0) {
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
    const res = await fetch('/api/data');
    const res_json = res.json();
    return res_json
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
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    this.setState({
      fileReader: fileReader
    })
  }

  changeFileName(event) {
    const input = event.target.value;
    let fileName = input.replace(/^.*[\\\/]/, '');
    if (fileName === '') {
      fileName = 'UPLOAD FILE';
    }
    this.setState({
      fileName: fileName
    })
  }

  async postData() {
      const results = Papa.parse(this.state.fileReader.result);

      const list = [];

      for (let i = 1; i < results.data.length; i += 1) {
        const dict = {};
        for (let n = 0; n < results.data[0].length; n += 1) {
          const key = results.data[0][n];
          if (key === "Submission Title" || key === "Submission Url" || key.substring(0, 4) === "Best") {
            dict[results.data[0][n]] = results.data[i][n]
          }
        }
        list[i] = dict;
      }

      console.log(list);

      const res = await fetch('/api/data', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tables: this.state.tableNum,
          clusters: this.state.clusterNum,
          waves: this.state.waveNum,
          filename: this.state.fileName,
          csv: list
        })
      });
      const res_json = res.json();
      return res_json;
    }

  routeToPrev() {
    this.postData().then(result => console.log(result));
    this.props.history.push("/categories");
  }

  routeToNext() {
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
