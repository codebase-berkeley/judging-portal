const express = require('express');
const path = require('path');
var bodyParser = require('body-parser')


const app = express();
const cors = require('cors');

app.use(cors());

const db = {
  'apis': [],
  'general_categories': [],
  'fellowships': [],
  'tables': 0,
  'clusters': 0,
  'waves': 0,
  'filename': "empty",
  "judge_list": [],
  "projects": []
}

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.json());
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
      "name":'Julia',
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

app.get('/api/apis', (req, res) => {
  const apis = ["METHIS ", "UpName", "Fake Name Generator", "Behind the Name"]

  // Return them as json
  res.json(apis);
  console.log(`Sent APIs`)
});
  
  
  
app.post('/api/dummy', (req, res) => {
  const {dummy} = req.body;
  res.json("You successfully posted: ".concat(dummy));  
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);
