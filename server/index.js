const express = require('express');
const Router = require('express-promise-router');
const path = require('path');
var bodyParser = require('body-parser');
const db = require('./db/index');

const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

// const db = {
//   'apis': [],
//   'general_categories': [],
//   'fellowships': [],
//   'tables': '',
//   'clusters': '',
//   'waves': '',
//   'filename': 'UPLOAD FILE',
//   "judge_list": [],
//   "projects": []
// }

// ########### HOME API EXAMPLES BEGIN ###########

app.get('/api/home', async (req, res) => {
  try {
    const query = await db.query('SELECT * FROM judges;');
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
});

app.post('/api/dummy', async (req, res) => {
  const { dummy } = req.body;
  db.query('INSERT INTO judges(name, API, projectId, score) VALUES($1 ,$2, $3, $4)', [
      dummy,
      "mentoredAPI",
      1,
      -1
    ]);
  res.json("You successfully posted: ".concat(dummy));
});

app.put('/api/score/:judgeName', async (req, res) => {
  const { judgeName } = req.params;
  const { projectId, score } = req.body;
  db.query('UPDATE judges SET score = $1 WHERE name = $2 AND projectId = $3;', [
    score,
    judgeName,
    projectId
  ]);
  res.json('Score update successfully');
});

// ########### HOME API EXAMPLES END ###########

// API endpoint for projects
app.get('/api/projects', async (req, res) => {
  try {
    const query = await db.query('SELECT * FROM projects;');
    res.send(query.rows);
  } catch (error) {
      console.log(error.stack);
  }
});

// API endpoint for each judge's list of projects
app.get('/api/projects/:judgeId', async (req, res) => {
  const { judgeId } = req.params;
  try {
    const query = await db.query('SELECT projects.*, filtered.score FROM projects INNER JOIN (SELECT * FROM scores WHERE scores.judgeId = $1) AS filtered ON projects.projectId=filtered.projectId', [
      judgeId
    ]);
    res.send(query.rows);
  } catch (error) {
      console.log(error.stack);
  }
});

// updating project scores
app.put('/api/scoreupdate/judge/:judgeId/project/:projectId', async (req, res) => {
  const { judgeId, projectId } = req.params;
  const { score } = req.body;
  db.query('UPDATE scores SET score = $1 WHERE judgeId = $2 AND projectId = $3;', [
    score,
    judgeId,
    projectId
  ]);
  res.json('Score update successfully');
});

// API endpoint for judge names
app.get('/api/judgenames', async (req, res) => {
    try {
      const query = await db.query('SELECT name, judgeId FROM judges;');
      res.send(query.rows);
    } catch (error) {
      console.log(error.stack);
    }
});

app.get('/api/lists', async (req, res) => {
  try {
    const query = await db.query('SELECT * FROM lists;');
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack)
  }
});

app.post('/api/lists', async (req, res) => {
  const {deleted, added } = req.body;
  console.log(deleted);
  var i;
  for (i = 0; i < deleted.length; i++) {
    console.log("DELETING: " + deleted[i]);
    db.query('DELETE FROM lists WHERE type=\'' + deleted[i][0] +'\' AND name=\'' + deleted[i][1]+'\';');
    console.log('DELETE FROM lists WHERE type=\'' + deleted[i][0] +'\' AND name=\'' + deleted[i][1]+'\';');
  }
  for (i = 0; i < added.length; i++) {
    console.log("ADDING: " + added[i]);
    db.query('INSERT INTO lists VALUES(\'' + added[i][0] + '\', \'' + added[i][1] +'\');');
    console.log('INSERT INTO lists VALUES(\'' + added[i][0] + '\', \'' + added[i][1] +'\');');
  }
  
  res.json("Databse has been updated");

});

app.get('/api/judgeinfo', (req, res) => {
  const judgeinfo = db['judge_list']

  // Return them as json
  res.json(judgeinfo);
  console.log(`Sent APIs`)
});

app.get('/api/data', async (req, res) => {
  try {
    const query = await db.query('SELECT * FROM dataentry;');
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
})

app.post('/api/data', (req, res) => {
  const dict = req.body;

  db.tables = dict['tables']
  db.clusters = dict['clusters']
  db.waves = dict['waves']
  db.filename = dict['filename']

  res.json("You successfully posted: ".concat(dict['tables']));
});

app.get('/api/judgeinfo', async (req, res) => {
  try {
    const query = await db.query('SELECT * FROM judges;');
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
});

app.post('/api/judgeinfo', (req, res) => {
  const {info} = req.body;
  db.judge_list = info['info']
  res.json("You successfully posted: ".concat(info));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Database listening on ${port}`);
