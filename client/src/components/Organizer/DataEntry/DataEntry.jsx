import React, { Component } from 'react';
import '../OrganizerPortal.css';
import { formatWithOptions } from 'util';

const Papa = require('papaparse');

class DataEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tableNum: '',
      maxNum: '',
      waveNum: '',
      tablesName: 'UPLOAD FILE',
      tablesReader: null,
      projectsName: 'UPLOAD FILE',
      projectsReader: null
    };
    this.handleTable = this.handleTable.bind(this);
    this.handleMax = this.handleMax.bind(this);
    this.handleWave = this.handleWave.bind(this);
    this.handleTablesFileUpload = this.handleTablesFileUpload.bind(this);
    this.handleTablesFileRead = this.handleTablesFileRead.bind(this);
    this.changeTablesFileName = this.changeTablesFileName.bind(this);
    this.handleProjectsFileUpload = this.handleProjectsFileUpload.bind(this);
    this.handleProjectsFileRead = this.handleProjectsFileRead.bind(this);
    this.changeProjectsFileName = this.changeProjectsFileName.bind(this);
    this.routeToNext = this.routeToNext.bind(this);
  }

  componentDidMount() {
    this.getDataEntry().then(result => {
      if (result[0].tablesname === '') {
        this.setState({
          tableNum: '',
          maxNum: '',
          waveNum: '',
          tablesName: 'UPLOAD FILE',
          projectsName: 'UPLOAD FILE'
        })
      } else {
          this.setState({
            tableNum: result[0].tables,
            maxNum: result[0].max,
            waveNum: result[0].waves,
            tablesName: result[0].tablesname,
            projectsName: result[0].projectsname
          })
      }
    });
  }

  async getDataEntry() {
    const res = await fetch('/api/data');
    const resJson = res.json();
    return resJson
  }

  handleTable(event) {
    this.setState({
      tableNum: event.target.value
    });
  }

  handleMax(event) {
    this.setState({
      maxNum: event.target.value
    });
  }

  handleWave(event) {
    this.setState({
      waveNum: event.target.value
    });
  }

  handleTablesFileUpload(event) {
    this.changeTablesFileName(event);
    this.handleTablesFileRead(event.target.files[0]);
  }

  handleTablesFileRead(file) {
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    this.setState({
      projectsReader: fileReader
    })
  }

  changeTablesFileName(event) {
    const input = event.target.value;
    let fileName = input.replace(/^.*[\\\/]/, '');
    if (fileName === '') {
      fileName = 'UPLOAD FILE';
    }
    this.setState({
      projectsName: fileName
    })
  }

  handleProjectsFileUpload(event) {
    this.changeProjectsFileName(event);
    this.handleProjectsFileRead(event.target.files[0]);
  }

  handleProjectsFileRead(file) {
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    this.setState({
      projectsReader: fileReader
    })
  }

  changeProjectsFileName(event) {
    const input = event.target.value;
    let fileName = input.replace(/^.*[\\\/]/, '');
    if (fileName === '') {
      fileName = 'UPLOAD FILE';
    }
    this.setState({
      projectsName: fileName
    })
  }

  async postData() {
    let tablesName = this.state.tablesName;
    if (this.state.tablesName === 'UPLOAD FILE') {
      tablesName = '';
    }
    let projectsName = this.state.projectsName;
    if (this.state.projectsName === 'UPLOAD FILE') {
      projectsName = '';
    }

    let results;
    const list = [];
    const keys = [];
    if (this.state.fileReader != null) {
      results = Papa.parse(this.state.fileReader.result);

      for (let i = 1; i < results.data.length; i += 1) {
        const dict = {};
        for (let n = 0; n < results.data[0].length; n += 1) {
          const key = results.data[0][n];
          if (key === 'Submission Title' || key === 'Submission Url' || key.substring(0, 4) === 'Best') {
            keys[i] = key;
            dict[results.data[0][n]] = results.data[i][n];
          }
        }
        list[i] = dict;
      }
      console.log(list);
    }
    const res = await fetch('/api/data', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tables: this.state.tableNum,
        max: this.state.maxNum,
        waves: this.state.waveNum,
        tablesname: tablesName,
        projectsname: projectsName,
        csvkeys: keys,
        csv: list
      })
    });
    const res_json = res.json();
    return res_json;
  }

  routeToNext() {
    if (this.state.tableNum != '' && this.state.clusterNum != '' && this.state.waveNum != '' && this.state.fileName != 'UPLOAD FILE') {
      this.postData();
      this.props.history.push('/judge-info');
    }
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
              <div className="data-element-title">PROJECTS PER TABLE</div>
              <input
                placeholder="Add Entry"
                onChange={this.handleTable}
                className="data-entry-input"
                value={this.state.tableNum}
              />
            </div>

            <div className="data-entry-element">
              <div className="data-element-title">MAX PROJECTS PER JUDGE</div>
              <input
                placeholder="Add Entry"
                onChange={this.handleMax}
                className="data-entry-input"
                value={this.state.maxNum}
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
              <div className="data-element-title">UPLOAD TABLES</div>
              <input
                type="file"
                id="og-file"
                onChange={this.handleTablesFileUpload}
                className="upload-file"
              />
              <label htmlFor="og-file">{this.state.tablesName}</label>
            </div>

            <div className="data-entry-element">
              <div className="data-element-title">UPLOAD PROJECTS</div>
              <input
                type="file"
                id="og-file"
                onChange={this.handleProjectsFileUpload}
                className="upload-file"
              />
              <label htmlFor="og-file">{this.state.projectsName}</label>
            </div>

            <div className="data-button nav">
              <button className="button" type="submit" onClick={this.routeToNext}>NEXT</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DataEntry;
