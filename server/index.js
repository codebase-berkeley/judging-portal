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

app.post('/api/apis', async (req, res) => {
  await db.query('DELETE FROM apis;');
  const { apis } = req.body;
  for (let i = 0; i < apis.length; i ++) {
    await db.query('INSERT INTO apis(name, type) VALUES($1 ,$2)', [
      apis[i][1],
      apis[i][0]
    ]);
  }
  res.json("You successfully posted to apis");
});

app.get('/api/projects', async (req, res) => {
  try {
    const query = await db.query('SELECT * FROM projects;');
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
});

app.get('/api/apis', async (req, res) => {
  try {
    const query = await db.query('SELECT * FROM apis;');
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
});

app.post('/api/projects', async (req, res) => {
  await db.query('DELETE from scores;');
  await db.query('DELETE FROM projects;');
  const { projectCSV } = req.body;
  for (let i = 1; i < projectCSV.length; i++) {
    const project = projectCSV[i];
    await db.query('INSERT INTO projects(name, github, categories, projectId) VALUES($1 ,$2, $3, $4)', [
      project['Submission Title'],
      project['Submission Url'],
      project['Categories'], 
      i
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
      await db.query('UPDATE projects SET wave = $1 WHERE projectId = $2;', [
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
      await db.query('UPDATE projects SET tableName = $1 WHERE projectId = $2;', [
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

// endpoint to get scored projects in the Scoring Overview page
app.get('/api/scored/judge/:judgeId', async (req, res) => {
  try {
    const { judgeId } = req.params;
    const query = await db.query('SELECT DISTINCT ON (projects.projectId) projects.projectId, projects.name, projects.categories, projects.github, projects.tableName, projects.wave, filtered.score FROM projects INNER JOIN (SELECT * FROM scores WHERE scores.judgeId = $1 AND scores.score IS NOT NULL) AS filtered ON projects.projectId=filtered.projectId;', [
      judgeId
    ]);
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
});

// endpoint to get unscored projects in the Scoring Overview page
app.get('/api/unscored/judge/:judgeId', async (req, res) => {
  try {
    const { judgeId } = req.params;
    const query = await db.query('SELECT DISTINCT ON (projects.projectId) projects.projectId, projects.name, projects.categories, projects.github, projects.tableName, projects.wave, filtered.score FROM projects INNER JOIN (SELECT * FROM scores WHERE scores.judgeId = $1 AND scores.score IS NULL) AS filtered ON projects.projectId=filtered.projectId;', [
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
  await db.query('UPDATE scores SET score = $1 WHERE judgeId = $2 AND projectId = $3 AND category = $4;', [
    score,
    judgeId,
    projectId,
    category
  ]);
  res.json('Score update successfully');
});

// ########### DATAENTRY END ###########

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
    const { info } = req.body;
    if (info.length > 1) {
      await db.query('INSERT INTO judges(name, API) VALUES($1, $2)', [
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
    const apiName = apisJSON[i].name;
    apiMappings[apiName] = { index: 0, judges: [] };
  }
  apiMappings["General Category"] = {index: 0, judges: []};

  var j;
  for (j = 0; j < judgeJSON.length; j += 1) {
    const api = judgeJSON[j]['api'];
    apiMappings[api].judges = apiMappings[api].judges.concat(judgeJSON[j].judgeid);
  }
  return apiMappings; 

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

    const apis = await db.query('SELECT * FROM apis WHERE type=$1;', ['API']);
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
            var currCatKey = 'General Category'
            let apiJudges = apiMappings[currCatKey].judges;
            let apiIndex = (apiMappings[currCatKey].index - 1) % apiJudges.length;
            if (apiIndex < 0) {
              apiIndex = apiJudges.length - 1;
            }
            await db.query('INSERT INTO scores(judgeID, projectID, category) VALUES ($1, $2, $3)', [
              apiJudges[apiIndex],
              currProj.projectid,
              currCat
            ]);
            continue;
          } else {
            hasGC = true;
            var currCatKey = 'General Category';
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
    const { deleted } = req.body;
    if (deleted.length > 1) {
      await db.query('DELETE FROM judges WHERE name=\'' + deleted[0] + '\' AND API=\'' + deleted[1] + '\';');
    }
    res.json("You successfully posted: ".concat(deleted));
  } catch (error) {
    console.log(error.stack)
  }

})

app.get('/api/scores', async (req, res) => {
  try {
    const query = await db.query('SELECT * FROM scores;');
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
});

app.get('/api/projectscore/:id',  async (req, res) => {
  try {
    const { id } = req.params;
    const query = await db.query('SELECT * FROM scores WHERE projectID=' + id);
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack)
  }
})

app.get('/api/categories', async (req, res) => {
  try {
    const query = await db.query('SELECT DISTINCT category FROM scores;');
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
});

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


app.get('/api/winners', async (req, res) => {
  try {
    const apis = await db.query('SELECT DISTINCT category FROM scores ORDER BY category;');
    const apisJSON = apis.rows;
    const winnersJSON = {};
    let currCat, query;
    for (let i = 0; i < apisJSON.length; i += 1) {
      currCat = apisJSON[i].category;
      query = await db.query('SELECT * FROM scores WHERE category = $1 ORDER BY score DESC;', [currCat]);
      projects = query.rows;
      winnersJSON[currCat] = [];

      let currID, nameQuery, name, currJudgeID, judgeNameQuery, judgeName;
      for (let j = 0; j < projects.length; j += 1) {
        currID = projects[j].projectid;
        nameQuery = await db.query('SELECT name FROM projects WHERE projectId = $1', [currID]);
        name = nameQuery.rows[0].name;

        currJudgeID = projects[j].judgeid;
        judgeNameQuery = await db.query('SELECT name FROM judges WHERE judgeId = $1', [currJudgeID]);
        judgeName = judgeNameQuery.rows[0].name;

        winnersJSON[currCat] = winnersJSON[currCat].concat([{ projectname: name, judgename: judgeName, score: projects[j].score }]);
      }
    }
    res.send(winnersJSON);

  } catch (error) {
    console.log(error.stack);
  }
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Database listening on ${port}`);
