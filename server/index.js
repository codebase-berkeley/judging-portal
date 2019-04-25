const express = require('express');
const Router = require('express-promise-router');
const path = require('path');
var bodyParser = require('body-parser');
const db = require('./db/index');

const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

// ########### DATAENTRY START ###########
app.post('/api/apis', async (req, res) => {
  const { apis } = req.body;
  for (let i = 0; i < apis.length; i ++) {
    db.query('INSERT INTO apis(name, type) VALUES($1 ,$2)', [
      apis[i][1],
      apis[i][0]
    ]);
  }

  res.json("You successfully posted to apis");
});

app.get('/api/projects', async (req, res) => {
  try {
    const query = await db.query('SELECT * FROM projects;');
    res.send(query.rows);
  } catch (error) {
      console.log(error.stack);
  }
});

app.post('/api/projects', async (req, res) => {
  const { projectCSV } = req.body;
  for (let i = 1; i < projectCSV.length; i++) {
    const project = projectCSV[i];
    db.query('INSERT INTO projects(name, github, categories) VALUES($1 ,$2, $3)', [
      project['Submission Title'],
      project['Submission Url'],
      project['Categories']
    ]);
  }

  res.json("You successfully posted to projects");
});

app.put('/api/projects', async (req, res) => {
  const { projectNum, waveNum, tableNum, tablesCSV } = req.body;
  if (tableNum * tablesCSV.length * waveNum < projectNum) {
    console.log("error: not enough capacity");
  } else {
    //wave assignment
    let w = 1;
    for (let id = 1; id <= projectNum; id++) {
      db.query('UPDATE projects SET wave = $1 WHERE projectId = $2;', [
        w,
        id
      ]);
      w++;
      if (w > waveNum) {
        w = 1;
      }
    }
  }
        
    //table assignment -- this is just based the asusmption that given a list of 
    //tables the projects should spread evenly amoung the tables
    let t = 0;
    for (let i = 1; i < projectNum; i++) {
      db.query('UPDATE projects SET tableName = $1 WHERE projectId = $2;', [
        tablesCSV[t][0],
        i
      ]);
      t++;
      if (t === tablesCSV.length) {
        t = 0;
      }
    }

    res.json("You successfully posted to projects");
});
// ########### DATAENTRY END ###########


// ########### JUDGEINFO START ###########
app.get('/api/judgeinfo', async (req, res) => {
  try {
    const query = await db.query('SELECT * FROM judges;');
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
});

app.post('/api/judgeinfo', async (req, res) => {
  const { info, deleted } = req.body;
  res.json()
  db.query('INSERT INTO judges(name, API) VALUES($1 ,$2)', [
      info[0],
      info[1]
  ]);
  var i;
  for (i = 0; i < deleted.length; i++) {
    db.query('DELETE FROM judges WHERE name=\'' + deleted[i][0] +'\' AND API=\'' + deleted[i][1]+'\';');
    console.log('DELETE FROM lists WHERE type=\'' + deleted[i][0] +'\' AND name=\'' + deleted[i][1]+'\';');
  }
  res.json("You successfully posted: ".concat(info));
});
// ########### JUDGEINFO END ###########

// API endpoint for judge names
app.get('/api/judgenames', async (req, res) => {
    try {
      const query = await db.query('SELECT name FROM judges;');
      res.send(query.rows);
    } catch (error) {
      console.log(error.stack);
    }
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Database listening on ${port}`);
