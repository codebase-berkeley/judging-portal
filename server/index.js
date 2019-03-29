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
	  	"API": "Google Vision",
      "Table": "45",
      "score": -1
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
