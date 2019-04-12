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
  console.log(judgeName, projectId, score);
  db.query('UPDATE judges SET score = $1 WHERE name = $2 AND projectId = $3;', [
    score,
    judgeName,
    projectId
  ]);
  res.json('Score update successfully');
});

// ########### HOME API EXAMPLES END ###########

app.get('/api/data', (req, res) => {
  const data = {
    'tables': db['tables'],
    'clusters': db['clusters'],
    'waves': db['waves'],
    'filename': db['filename']
  }
  res.json(data);
  console.log(`Sent data`);
})

// API endpoint for projects
app.get('/api/projects', async (req, res) => {
  try {
    const query = await db.query('SELECT * FROM projects;');
    res.send(query.rows);
  } catch (error) {
      console.log(error.stack);
  }
});

// API endpoint for judge names
app.get('/api/judgenames', async (req, res) => {
    try {
      const query = await db.query('SELECT name FROM judges;');
      res.send(query.rows);
    } catch (error) {
      console.log(error.stack);
    }
});

app.get('/api/lists', (req, res) => {
  res.json(db);
});

app.post('/api/lists', (req, res) => {
  const { apis, general_categories, fellowships } = req.body;
  db.apis = apis;
  db.general_categories = general_categories;
  db.fellowships = fellowships; });

app.get('/api/judgeinfo', (req, res) => {
  const judgeinfo = db['judge_list']

  // Return them as json
  res.json(judgeinfo);
  console.log(`Sent APIs`)
});

app.post('/api/data', (req, res) => {
  console.log(req.body)
  const dict = req.body;
  db.tables = dict['tables']
  db.clusters = dict['clusters']
  db.waves = dict['waves']
  db.filename = dict['filename']
  res.json("You successfully posted: ".concat(dict['tables']));
});

app.post('/api/judgeinfo', (req, res) => {
  const info = req.body;
  db.judge_list = info['info']
  res.json("You successfully posted: ".concat(info));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Database listening on ${port}`);
