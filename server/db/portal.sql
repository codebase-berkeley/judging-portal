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
  categories VARCHAR(254)[],
  wave INTEGER,
  table VARCHAR(254)
);

CREATE TABLE apis
(
  API VARCHAR(254)
);

CREATE TABLE scores
(
  judgeId INTEGER REFERENCES judges(judgeId),
  projectId INTEGER REFERENCES projects(projectId),
  category VARCHAR(254),
  score INTEGER
);

INSERT INTO judges VALUES ('lawrence', 'codebaseAPI', 10);
INSERT INTO judges VALUES ('parth', 'general categories', 20);
INSERT INTO judges VALUES ('calhacks', 'calhacksAPI', 30);

INSERT INTO projects VALUES (1, 'mentored', 'https://github.com/codebase-berkeley/judging-portal', '{"General Category 1", "codebaseAPI"}');
INSERT INTO projects VALUES (2, 'calhacks', 'https://github.com/codebase-berkeley/', '{"General Category 1", "General Category2", "calhacksAPI"}');
INSERT INTO projects VALUES (3, 'atlassian', 'https://github.com/codebase-berkeley/', '{"calhacksAPI"}');

INSERT INTO apis VALUES ('codebaseAPI');
INSERT INTO apis VALUES ('calhacksAPI');
INSERT INTO apis VALUES ('General Category 1');
INSERT INTO apis VALUES ('General Category 2');

INSERT INTO scores VALUES (30, 3, 'calhacksAPI', 5);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON DATABASE portal TO root;
