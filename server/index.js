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

// API endpoint for judge names
app.get('/api/judgenames', async (req, res) => {
    try {
      const query = await db.query('SELECT name FROM judges;');
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

  res.json("Database has been updated");

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
  const { tables, max, waves, tablesname, projectsname, csv} = req.body;
  db.query('UPDATE dataentry SET tables = $1, max = $2, waves = $3, tablesname = $4, projectsname = $5;', [
      tables,
      max,
      waves,
      tablesname,
      projectsname
    ]);
  let i;
  for (i = 1; i < csv.length; i++) {
    const project = csv[i];
    db.query('INSERT INTO csv (name, url, BestMobileApp, BestWebApp, BestHardwareHack, BestVRHack, BestMLHack, BestHealthHack, BestEducationHack, BestEntertainmentHack, BestBeginnerHack) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);', [
      project['Submission Title'],
      project['Submission Url'],
      project['Best Mobile App'],
      project['Best Web App'],
      project['Best Hardware Hack'],
      project['Best VR Hack'],
      project['Best ML Hack'],
      project['Best Health Hack'],
      project['Best Education Hack'],
      project['Best Entertainment Hack'],
      project['Best Beginner Hack']
    ])
  }
  res.json("You successfully posted to dataentry");
});

app.get('/api/apis', async (req, res) => {
  try {
    const query = await db.query('SELECT * FROM apis;');
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
  try {
    const {info} = req.body;
    if (info.length > 1) {
      db.query('INSERT INTO judges(name, API) VALUES($1, $2)', [
        info[0],
        info[1]
      ]);
    }
    res.json("Successfully posted ".concat(info[0]));
  } catch (error) {
    console.log(error.stack);
  }
}); 

function getApiMapping(apisJSON, judgeJSON) {
  /**
   * @param {*} apisJSON
   * @param {*} judgeJSON 
   * 
   * @returns an json that maps each api to another json objects with index and judges as fields 
   */
  let apiMappings = {};
  var i;
  for (i = 0; i < apisJSON.length; i += 1) {
    const apiName = apisJSON[i]['api'];
    apiMappings[apiName] = {index: 0, judges: []};
  }
  console.log(apiMappings);

  var j;
  for (j = 0; j < judgeJSON.length; j += 1) {
    const api = judgeJSON[j]['api'];
    console.log(api);
    apiMappings[api].judges = apiMappings[api].judges.concat(judgeJSON[j]['judgeid']);
  }
  return apiMappings; 
}

app.post('/api/assignjudges', async (req, res) => {
  /**
   * pseudo:
   * fetch all judges and all projects as lists of JSONs
   * sort the judges into a list all judges scoring each api and one for all general category judges 
   * loop through each project and find the next judge of each of this project's api (a pointer that traverses judge list)
   * inserts assignments into scores table
   */
  try {
    await db.query('DELETE FROM scores;');

    const { } = req.body;
    const judges = await db.query('SELECT * FROM judges;');
    const judgeJSON = judges.rows;

    const projects = await db.query('SELECT * FROM projects;');
    const projectsJSON = projects.rows;

    const apis = await db.query('SELECT * FROM apis;');
    const apisJSON = apis.rows;

    let apiMappings = getApiMapping(apisJSON, judgeJSON);

    //now we match
    let i;
    /**
     * looping through projects to match judges
     */
    for (i = 0; i < projectsJSON.length; i += 1) {

      const currProj = projectsJSON[i];
      const categories = currProj.categories;
      let hasGC = false;
      let j;
      for (j = 0; j < categories.length; j += 1) {
        /**
         * loops through the categories of each project
         */
        let currCat = categories[j];

        if (currCat.slice(0, 3) === "GC:") {
          /**
           * check if category is a general category
           * assigns the category JSON key accordingly
           */
          if (hasGC) {
            continue;
          } else {
            hasGC = true;
            var currCatKey = 'GC';
          }
        } else {
          var currCatKey = currCat;
        }
        let apiJudges = apiMappings[currCatKey].judges;
        let apiIndex = apiMappings[currCatKey].index;
        apiMappings[currCatKey].index = (apiMappings[currCatKey].index + 1) % apiJudges.length;

        await db.query('INSERT INTO scores(judgeID, projectID, category) VALUES ($1, $2, $3)', [
          apiJudges[apiIndex],
          currProj.projectid,
          currCat
        ]);
      }
    }

  } catch (error) {
    console.log(error.stack);
  }

})

app.post('/api/deletejudge', async (req, res) => {
  try {
    const {deleted} = req.body;
    if (deleted.length > 1) {
      db.query('DELETE FROM judges WHERE name=\'' + deleted[0] + '\' AND API=\'' + deleted[1] + '\';');
    }
    res.json("You successfully posted: ".concat(deleted));
  } catch (error) {
    console.log(error.stack)
  }
})

app.get('/api/projectscore/:id',  async (req, res) => {
  try {
    const { id } = req.params;
    const query = await db.query('SELECT * FROM scores WHERE projectID=' + id);
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack)
  }
})

app.get('/api/projectname/:id',  async (req, res) => {
  try {
    const { id } = req.params;
    const query = await db.query('SELECT * FROM projects WHERE projectID=' + id);
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack)
  }
})

app.get('/api/judgename/:id',  async (req, res) => {
  try {
    const { id } = req.params;
    const query = await db.query('SELECT * FROM judges WHERE judgeId=' + id);
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack)
  }
})

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Database listening on ${port}`);
