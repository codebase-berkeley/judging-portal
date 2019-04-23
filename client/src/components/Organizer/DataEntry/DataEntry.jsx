import React, { Component } from 'react';
import '../OrganizerPortal.css';
import { formatWithOptions } from 'util';

const Papa = require('papaparse');

class DataEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numProjects: 0,
      tableNum: '',
      maxNum: '',
      waveNum: '',
      tableCSVName: 'UPLOAD FILE',
      tablesReader: null,
      tablesLength: 0,
      projectCSVName: 'UPLOAD FILE',
      projectsReader: null,
      projectsLength: 0
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
    this.postProjects = this.postProjects.bind(this);
    this.postProjects = this.postProjects.bind(this);
  }

  componentDidMount() {
    this.getProjects().then(result => {
      if (this.state.tablesReader === null) {
        this.setState({
          tableNum: '',
          maxNum: '',
          waveNum: '',
          tableCSVName: 'UPLOAD FILE',
          projectCSVName: 'UPLOAD FILE'
        })
      } else {
          this.setState({
            tableNum: result[0].tables,
            maxNum: result[0].max,
            waveNum: result[0].waves,
            tableCSVName: result[0].tablesname,
            projectCSVName: result[0].projectsname
          })
      }
    });
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
    this.postTables();
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
  async postProjects() {
    try {
      if (this.state.projectCSVName === 'UPLOAD FILE') {
        this.state.projectCSVName = '';
      }
  
      let results;
      const list = [];
      if (this.state.projectsReader != null) {
        results = Papa.parse(this.state.projectsReader.result);

        this.setState({
          numProjects: results.data.length
        })
  
        for (let i = 1; i < results.data.length; i += 1) {
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
          dict['Categories'] = categories;
          list[i] = dict;
        }
        console.log(list);
      }
  
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          projectCSV: list
        })
      });
      const res_json = res.json();
      return res_json;

    } catch (error) {
      console.log(error.stack);
    }
  }

  async getProjects() {
    try {
      const res = await fetch('api/projects'); 
      const resJson = res.json(); 
      return resJson; 
    } catch(error) {
      console.log(error.stack);
    }
  }

  async postTables() {
    try {
      if (this.state.tableCSVName === 'UPLOAD FILE') {
        this.state.tableCSVName = '';
      }
  
      let results;
      let list;
      let length;
      if (this.state.tablesReader != null) {
        results = Papa.parse(this.state.tablesReader.result);
        list = results.data;
        length = list.length;
      }

      console.log(list);
      //this.state.tablesReader = list;
      this.setState({
        tablesLength: length
      })

      const res = await fetch('/api/projects', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          numProjects: this.state.numProjects,
          tableNum: this.state.tableNum,
          waveNum: this.state.waveNum,
          tablesCSV: list
        })
      });
      const res_json = res.json();
      return res_json;

    } catch (error) {
      console.log(error.stack)
    }
  }

  routeToNext() {
    if (this.state.tableNum !== '' && this.state.waveNum !== '' && this.state.tableCSVName !== 'UPLOAD FILE') {
      // if (this.state.tableNum * this.state.tablesReader.result.data.length * this.state.waveNum < this.state.numProjects) {
      //   alert('error: not enough capacity');
      // }
      this.postProjects();
      console.log("tableNum" + this.state.tableNum);
      console.log("waveNum" + this.state.waveNum);
      console.log("tablesreader" + this.state.tablesLength);
      console.log("numprojects" + this.state.numProjects);
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
