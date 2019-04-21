DROP DATABASE IF EXISTS portal;

CREATE DATABASE portal;

CREATE USER root
WITH ENCRYPTED PASSWORD 'password';

\c portal;
CREATE TABLE judges
(
  judgeId INTEGER PRIMARY KEY,
  name VARCHAR(254),
  API VARCHAR(254)
);

CREATE TABLE projects
(
  projectId INTEGER PRIMARY KEY,
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

INSERT INTO judges VALUES (10, 'lawrence', 'codebaseAPI');
INSERT INTO judges VALUES (20, 'parth', 'GC');
INSERT INTO judges VALUES (30, 'calhacks', 'calhacksAPI');

INSERT INTO projects VALUES (1, 'mentored', 'https://github.com/codebase-berkeley/judging-portal', '{"GC: Web", "codebaseAPI"}');
INSERT INTO projects VALUES (2, 'calhacks', 'https://github.com/codebase-berkeley/', '{"GC: Web", "GC: Mobile", "calhacksAPI"}');
INSERT INTO projects VALUES (3, 'atlassian', 'https://github.com/codebase-berkeley/', '{"GC: Education", "calhacksAPI"}');

INSERT INTO apis VALUES ('codebaseAPI');
INSERT INTO apis VALUES ('calhacksAPI');
INSERT INTO apis VALUES ('GC');

INSERT INTO scores VALUES (20, 1, 'GC: Web', NULL);
INSERT INTO scores VALUES (10, 1, 'codebaseAPI', NULL);
INSERT INTO scores VALUES (20, 2, 'GC: Web', NULL);
INSERT INTO scores VALUES (20, 2, 'GC: Mobile', NULL);
INSERT INTO scores VALUES (30, 2, 'calhacksAPI', NULL);
INSERT INTO scores VALUES (20, 3, 'GC: Education', NULL);
INSERT INTO scores VALUES (30, 3, 'calhacksAPI', NULL);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON DATABASE portal TO root;
