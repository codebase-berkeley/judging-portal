DROP DATABASE IF EXISTS portal;

CREATE DATABASE portal;

CREATE USER root
WITH ENCRYPTED PASSWORD 'password';

\c portal;
CREATE TABLE judges
(
  judgeId SERIAL PRIMARY KEY,
  name VARCHAR(254),
  API VARCHAR(254)
);

CREATE TABLE projects
(
  projectId SERIAL PRIMARY KEY,
  name VARCHAR(254),
  github VARCHAR(254),
  categories VARCHAR(254)[],
  tableName VARCHAR(254),
  wave INTEGER
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

INSERT INTO judges(name, API) VALUES ('lawrence', 'codebaseAPI');
INSERT INTO judges(name, API) VALUES ('parth', 'GC');
INSERT INTO judges(name, API) VALUES ('warren', 'calhacksAPI');

INSERT INTO projects(name, github, categories, tableName, wave) VALUES ('mentored', 'https://github.com/codebase-berkeley/judging-portal', '{"GC: Web", "codebaseAPI"}', 'A1', 1);
INSERT INTO projects(name, github, categories, tableName, wave) VALUES ('calhacks', 'https://github.com/codebase-berkeley/', '{"GC: Mobile", "GC: Web", "calhacksAPI"}', 'A2', 2);
INSERT INTO projects(name, github, categories, tableName, wave) VALUES ('atlassian', 'https://github.com/codebase-berkeley/', '{"calhacksAPI"}', 'A3', 1);

INSERT INTO apis VALUES ('codebaseAPI');
INSERT INTO apis VALUES ('calhacksAPI');
INSERT INTO apis VALUES ('GC');

INSERT INTO scores VALUES (2, 1, 'GC: Web', 8);
INSERT INTO scores VALUES (1, 1, 'codebaseAPI', 9);
INSERT INTO scores VALUES (2, 2, 'GC: Web', 7);
INSERT INTO scores VALUES (2, 2, 'GC: Mobile', 8);
INSERT INTO scores VALUES (3, 2, 'calhacksAPI', 5);
INSERT INTO scores VALUES (2, 3, 'GC: Education', 6);
INSERT INTO scores VALUES (3, 3, 'calhacksAPI', 8);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON DATABASE portal TO root;
