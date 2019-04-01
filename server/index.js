const express = require('express');
const path = require('path');
var bodyParser = require('body-parser')


const app = express();

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
