const express = require('express');
const Router = require('express-promise-router');
const path = require('path');
var bodyParser = require('body-parser');
const db = require('./db/index');

const app = express();
const cors = require('cors');

app.use(cors());

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

app.get('/api/home', async (req, res) => {
  try {
    const query = await db.query('SELECT * FROM judges;');
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
});

app.post('/api/home', (req, res) => {
  const { dummy } = req.body;
  db.query('INSERT INTO judges(name, API, projects) VALUES($1 ,$2, $3)', [
      dummy,
      "mentoredAPI",
      []
    ]);
  res.json("You successfully posted: ".concat(dummy));
});

app.use(bodyParser.json());
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
app.get('/api/projects', (req, res) => {
  const projects = [
    {
      "id": 12345,
      "team": "Mulan and Warren",
      "api": "Google Vision",
      "table": "45",
      "score": ""
    },
    {
      "id": 13579,
      "team": "Andrew and Julia",
      "api": "Joke Generator",
      "table": "48",
      "score": "9"
    },
    {
      "id": 24680,
      "team": "Francesca and Rachel",
      "api": "Venmo",
      "table": "42",
      "score": "5"
    },
    {
      "id": 09876,
      "team": "Parth and Lawrence",
      "api": "Codecademy",
      "table": "69",
      "score": ""
    }
  ]

  // Return them as json
  res.json(projects);
  console.log(`Sent projects`);
});

// API endpoint for judge names
app.get('/api/judgenames', (req, res) => {
  const judgeNames = [
    {
      "name": 'Parth',
      "api": 'none'
    },
    {
      "name": 'Lawrence',
      "api": 'none'
    },
    {
      "name": 'Julia',
      "api": 'none'
    },
    {
      "name": 'Andrew',
      "api": 'none'
    },
    {
      "name": 'Anant',
      "api": 'ee'
    },
    {
      "name": 'Kris',
      "api": '16b'
    },
    {
      "name": 'Jaijeet',
      "api": 'MS'
    }
  ]

  res.json(judgeNames);
  console.log(`Sent judge names`);
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
