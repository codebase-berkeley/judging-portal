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
  console.log('begin');
  const { tableNum, tablesCSV } = req.body;
  for (let i = 1; i < tablesCSV.length; i++) {
    const table = tablesCSV[i][0];
    for (let j = 1; j < tableNum; j++) {
      console.log('here');
      db.query('UPDATE projects SET tableName = $1;', [
        table
      ]);
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
