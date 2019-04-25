import React, { Component } from 'react';
import '../OrganizerPortal.css';

const Papa = require('papaparse');

class DataEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tableNum: '',
      waveNum: '',
      tableCSVName: 'UPLOAD FILE',
      tablesReader: null,
      projectCSVName: 'UPLOAD FILE',
      projectsReader: null
    };
    this.handleTable = this.handleTable.bind(this);
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
    this.getProjects().then(result => {
      if (this.state.tablesReader === null) {
        this.setState({
          tableNum: '',
          waveNum: '',
          tableCSVName: 'UPLOAD FILE',
          projectCSVName: 'UPLOAD FILE'
        })
      } else {
          this.setState({
            tableNum: result[0].tables,
            waveNum: result[0].waves,
            tableCSVName: result[0].tablesname,
            projectCSVName: result[0].projectsname
          })
      }
    });
  }

  //this is for uploading the tables file
  handleTablesFileUpload(event) {
    this.changeTablesFileName(event);
    this.handleTablesFileRead(event.target.files[0]);
  }

  handleTablesFileRead(file) {
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    this.setState({
      tablesReader: fileReader
    })
  }

  changeTablesFileName(event) {
    const input = event.target.value;
    let fileName = input.replace(/^.*[\\\/]/, '');
    if (fileName === '') {
      fileName = 'UPLOAD FILE';
    }
    this.setState({
      tableCSVName: fileName
    })
  }

  //this is for uploading projects csv
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
      projectCSVName: fileName
    })
  }

  //posts data entry and files to the database
  postProjects() {
      if (this.state.projectCSVName === 'UPLOAD FILE') {
        this.state.projectCSVName = '';
      }
  
      let results;
      const list = [];
      let length;
      if (this.state.projectsReader != null) {
        results = Papa.parse(this.state.projectsReader.result);
        length = results.data.length;

        for (let i = 1; i < length; i += 1) {
          const dict = {};
          const categories = [];
          for (let n = 0; n < results.data[0].length; n += 1) {
            const key = results.data[0][n];
            const value = results.data[i][n];
            if (key === 'Submission Title' || key === 'Submission Url') {
              dict[key] = value;
            }
            if (key.substring(0, 3) === 'API' || key.substring(0, 2) === 'GC') {
              if (value !== 'FALSE') {
                categories.push(key);
              }
            }
          }
          dict.Categories = categories;
          list[i] = dict;
        }
      }
  
      const res = fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          projectCSV: list
        })
      }).then (r => r.json());
      return [length, res];
  }

  async getProjects() {
    try {
      const res = await fetch('api/projects'); 
      const resJson = res.json(); 
      return resJson; 
    } catch(error) {
    }
  }

  handleWave(event) {
    this.setState({
      waveNum: event.target.value
    });
  }

  handleTable(event) {
    this.setState({
      tableNum: event.target.value
    });
  }

  postTables(length) {
    if (this.state.tableCSVName === 'UPLOAD FILE') {
      this.state.tableCSVName = '';
    }

    let results;
    let list;
    let tableLength;


    if (this.state.tablesReader != null) {
      results = Papa.parse(this.state.tablesReader.result);
      list = results.data;
      tableLength = list.length;
    }

    const res = fetch('/api/projects', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        projectNum: length,
        tableNum: this.state.tableNum,
        waveNum: this.state.waveNum,
        tablesCSV: list
      })
    }).then(r => r.json());
    return [tableLength, res];
  }

  routeToNext() {
    if (this.state.tableNum !== '' && this.state.waveNum !== '' && this.state.tableCSVName !== 'UPLOAD FILE') {
      const [projectLength, p_apiResponse] = this.postProjects();
      const [tableLength, t_apiResponse] = this.postTables(projectLength);
      if (this.state.tableNum * tableLength * this.state.waveNum < projectLength) {
        alert('error: not enough capacity');
      }
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
                id="tables-file"
                onChange={this.handleTablesFileUpload}
                className="upload-file"
              />
              <label htmlFor="tables-file">{this.state.tableCSVName}</label>
            </div>

            <div className="data-entry-element">
              <div className="data-element-title">UPLOAD PROJECTS</div>
              <input
                type="file"
                id="projects-file"
                onChange={this.handleProjectsFileUpload}
                className="upload-file"
              />
              <label htmlFor="projects-file">{this.state.projectCSVName}</label>
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
