const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// API endpoint for projects
app.get('/api/projects', (req, res) => {
  const projects = [
  	{
	  	"id": 1234,
	  	"team": "Mulan and Warren",
	  	"API": "Google Vision",
	  	"Table": "45"
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

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);
