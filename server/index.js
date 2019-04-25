const express = require('express');
const Router = require('express-promise-router');
const path = require('path');
var bodyParser = require('body-parser');
const db = require('./db/index');

const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

// ########### DATAENTRY START ###########
app.get('/api/projects', async (req, res) => {
  try {
    const query = await db.query('SELECT * FROM projects;');
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
});

app.post('/api/projects', async (req, res) => {
  const { projectCSV } = req.body;
  for (let i = 1; i < projectCSV.length; i++) {
    const project = projectCSV[i];
    db.query('INSERT INTO projects(name, github, categories) VALUES($1 ,$2, $3)', [
      project['Submission Title'],
      project['Submission Url'],
      project['Categories']
    ]);
  }

  res.json("You successfully posted to projects");
});

app.put('/api/projects', async (req, res) => {
  const { projectNum, waveNum, tableNum, tablesCSV } = req.body;
  if (tableNum * tablesCSV.length * waveNum < projectNum) {
    console.log("error: not enough capacity");
  } else {
    // wave assignment
    let w = 1;
    for (let id = 1; id <= projectNum; id++) {
      db.query('UPDATE projects SET wave = $1 WHERE projectId = $2;', [
        w,
        id
      ]);
      w++;
      if (w > waveNum) {
        w = 1;
      }
    }

    // table assignment -- this is just based the asusmption that given a list of 
    // tables the projects should spread evenly amoung the tables
    let t = 0;
    for (let i = 1; i < projectNum; i++) {
      db.query('UPDATE projects SET tableName = $1 WHERE projectId = $2;', [
        tablesCSV[t][0],
        i
      ]);
      t++;
      if (t === tablesCSV.length) {
        t = 0;
      }
    }
  }
});

app.get('/api/project-tables-waves', async(req, res) => {
  try {
    const query = await db.query('SELECT name, wave, tableName FROM projects;');
    res.send(query.rows);
  } catch(error) {
    console.log(error.stack);
  }
})

// API endpoint for judge names for Judge Login
app.get('/api/judgenames', async (req, res) => {
    try {
      const query = await db.query('SELECT judgeId, name FROM judges;');
      res.send(query.rows);
    } catch (error) {
      console.log(error.stack);
    }
});

// endpoint to draw all rows of projects in the Scoring Overview page
app.get('/api/toscore/judge/:judgeId', async (req, res) => {
  try {
    const { judgeId } = req.params;
    const query = await db.query('SELECT DISTINCT ON (projects.projectId) projects.projectId, projects.name, projects.categories, projects.github, projects.tableName, projects.wave, filtered.score FROM projects INNER JOIN (SELECT * FROM scores WHERE scores.judgeId = $1) AS filtered ON projects.projectId=filtered.projectId;', [
      judgeId
    ]);
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
});

// endpoint to select the categories to be scored for in each project info page
app.get('/api/categories/judge/:judgeId/project/:projectId', async (req, res) => {
  try {

    const { judgeId, projectId } = req.params;
    const query = await db.query('SELECT category, score FROM scores WHERE judgeId = $1 AND projectId = $2;', [
      judgeId,
      projectId
    ]);
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
});

// updating project scores
app.put('/api/scoreupdate/judge/:judgeId/project/:projectId/category/:category', async (req, res) => {
  const { judgeId, projectId, category } = req.params;
  const { score } = req.body;
  db.query('UPDATE scores SET score = $1 WHERE judgeId = $2 AND projectId = $3 AND category = $4;', [
    score,
    judgeId,
    projectId,
    category
  ]);
  res.json('Score update successfully');
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

// ########### DATAENTRY END ###########

app.get('/api/apis', async (req, res) => {
  try {
    const query = await db.query('SELECT * FROM apis;');
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack)
  }
});

// ########### JUDGEINFO START ###########
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

  res.json("You successfully posted: ".concat(info));
}
// ########### JUDGEINFO END ###########

// API endpoint for judge names
app.get('/api/judgenames', async (req, res) => {
  try {
    const query = await db.query('SELECT name FROM judges;');
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }

  var j;
  for (j = 0; j < judgeJSON.length; j += 1) {
    const api = judgeJSON[j]['api'];
    apiMappings[api].judges = apiMappings[api].judges.concat(judgeJSON[j]['judgeid']);
  }
  return apiMappings; 
});

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

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Database listening on ${port}`);
