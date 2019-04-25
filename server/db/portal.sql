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
  name VARCHAR(254),
  type VARCHAR(254)
);

CREATE TABLE scores
(
  judgeId INTEGER REFERENCES judges(judgeId),
  projectId INTEGER REFERENCES projects(projectId),
  category VARCHAR(254),
  score INTEGER
);
  
-- INSERT INTO judges(name, API) VALUES ('lawrence', 'API: Codebase');
-- INSERT INTO judges(name, API) VALUES ('parth', 'General Category');
-- INSERT INTO judges(name, API) VALUES ('warren', 'API: CalHacks');

-- INSERT INTO projects(name, github, categories, tableName, wave) VALUES ('mentored', 'https://github.com/codebase-berkeley/judging-portal', '{"GC: Web", "API: Codebase"}', 'A1', 1);
-- INSERT INTO projects(name, github, categories, tableName, wave) VALUES ('calhacks', 'https://github.com/codebase-berkeley/', '{"GC: Mobile", "GC: Web", "API: CalHacks"}', 'A2', 2);
-- INSERT INTO projects(name, github, categories, tableName, wave) VALUES ('atlassian', 'https://github.com/codebase-berkeley/', '{"API: CalHacks"}', 'A3', 1);

-- INSERT INTO apis VALUES ('API: Codebase', 'API');
-- INSERT INTO apis VALUES ('API: CalHacks', 'API');
-- INSERT INTO apis VALUES ('GC: Best Mobile', 'GC');
-- INSERT INTO apis VALUES ('GC: Best Web', 'GC');

-- INSERT INTO scores VALUES (2, 1, 'GC: Web', NULL);
-- INSERT INTO scores VALUES (1, 1, 'API: Codebase', NULL);
-- INSERT INTO scores VALUES (2, 2, 'GC: Web', NULL);
-- INSERT INTO scores VALUES (2, 2, 'GC: Mobile', NULL);
-- INSERT INTO scores VALUES (3, 2, 'API: CalHacks', NULL);
-- INSERT INTO scores VALUES (2, 3, 'GC: Education', NULL);
-- INSERT INTO scores VALUES (3, 3, 'calhacksAPI', NULL);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON DATABASE portal TO root;
