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

  changeFileName(event) {
    let input = event.target.value;
    let fileName = input.replace(/^.*[\\\/]/, '');
    if (fileName == '') {
      fileName = 'UPLOAD FILE';
    }
    this.setState({
      fileName: fileName
    })
    console.log(this.state.tableNum);
    console.log(this.state.clusterNum);
    console.log(this.state.waveNum);
  }

  componentDidMount() {
    this.getDataEntry().then(result => this.setState({
      tableNum: result['tables'],
      clusterNum: result['clusters'],
      waveNum: result['waves'],
      fileName: result['filename']
    }))
  }

  async getDataEntry() {
    let res = await fetch('/api/data');
    let res_json = res.json();
    return res_json
  }

  async postData(){
    let res = await fetch('/api/data', {
      method: 'POST',
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
                onChange={this.changeFileName}
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
