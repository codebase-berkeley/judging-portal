DROP DATABASE IF EXISTS portal;

CREATE DATABASE portal;

CREATE USER root
WITH ENCRYPTED PASSWORD 'password';

\c portal;
CREATE TABLE judges
(
  name VARCHAR(254),
  API VARCHAR(254),
  judgeId INTEGER PRIMARY KEY
);

CREATE TABLE projects
(
  projectId INTEGER PRIMARY KEY,
  name VARCHAR(254),
  github VARCHAR(254),
  categories VARCHAR(254)[]
);

CREATE TABLE apis
(
  API VARCHAR(254)
);

CREATE TABLE dataentry
(
  tables integer,
  clusters integer,
  waves integer,
  filename VARCHAR(254)
);

CREATE TABLE lists
(
  type VARCHAR(254),
  name VARCHAR(254)
);

CREATE TABLE scores
(
  judgeId INTEGER REFERENCES judges(judgeId),
  projectId INTEGER REFERENCES projects(projectId),
  score INTEGER
);

INSERT INTO judges VALUES ('lawrence', 'codebaseAPI', 10);
INSERT INTO judges VALUES ('parth', 'codebaseAPI', 20);
INSERT INTO judges VALUES ('calhacks', 'calhacksAPI', 30);

INSERT INTO projects VALUES (1, 'mentored', 'https://github.com/codebase-berkeley/judging-portal', '{"best team", "funnest team", "coolest team"}');
INSERT INTO projects VALUES (2, 'calhacks', 'https://github.com/codebase-berkeley/', '{"biggest hackathon"}');
INSERT INTO projects VALUES (3, 'atlassian', 'https://github.com/codebase-berkeley/', '{"lit team"}');

INSERT INTO dataentry VALUES ('5', '3', '10', 'devpost');

INSERT INTO apis VALUES ('myAPI');
INSERT INTO apis VALUES ('codebaseAPI');
INSERT INTO apis VALUES ('yoooAPI');
INSERT INTO apis VALUES ('bestAPI');

INSERT INTO lists VALUES ('api', 'Google Vision');
INSERT INTO lists VALUES ('api', 'Uber Autopilot');
INSERT INTO lists VALUES ('api', 'API #23');
INSERT INTO lists VALUES ('fellowships', 'UCB Golden Bear Fellowship');
INSERT INTO lists VALUES ('general', 'worst project');
INSERT INTO lists VALUES ('general', 'most average project');

INSERT INTO scores VALUES (10, 1, NULL);
INSERT INTO scores VALUES (20, 2, NULL);
INSERT INTO scores VALUES (30, 3, 5);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON DATABASE portal TO root;