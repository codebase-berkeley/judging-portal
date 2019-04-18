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

app.get('/api/lists', async (req, res) => {
  try {
    const query = await db.query('SELECT * FROM lists;');
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack)
  }
});

app.post('/api/lists', (req, res) => {
  const { apis, general_categories, fellowships } = req.body;
  db.apis = apis;
  db.general_categories = general_categories;
  db.fellowships = fellowships;
});

app.get('/api/data', async (req, res) => {
  try {
    const query = await db.query('SELECT * FROM dataentry;');
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
})

app.put('/api/data', async (req, res) => {
  // const dict = req.body;
  // res.json(dict);

  // db.tables = dict['tables']
  // db.clusters = dict['clusters']
  // db.waves = dict['waves']
  // db.filename = dict['filename']

  // res.json("You successfully posted: ".concat(dict['tables']));

  const { dict } = req.body;
  db.query('UPDATE dataentry SET tables = $1, clusters = $2, waves = $3, filename = $4;', [
      tables,
      clusters,
      waves,
      filename
    ]);
  res.json("You successfully posted to dataentry");
});

app.get('/api/apis', async (req, res) => {
  try {
    const query = await db.query('SELECT (api) FROM lists;');
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack)
  }
});

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

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Database listening on ${port}`);
