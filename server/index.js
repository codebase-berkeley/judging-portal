const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

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

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);
