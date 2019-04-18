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

CREATE TABLE lists
(
  api VARCHAR(254),
  fellowships VARCHAR(254),
  general VARCHAR(254)
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

INSERT INTO lists (API) VALUES ('Google Vision');
INSERT INTO lists (API) VALUES ('Uber Autopilot');
INSERT INTO lists (API) VALUES ('API #23');
INSERT INTO lists (fellowships) VALUES ('UCB Golden Bear Fellowship');
INSERT INTO lists (general) VALUES ('worst project');
INSERT INTO lists (general) VALUES ('most average project');

INSERT INTO scores VALUES (10, 1, NULL);
INSERT INTO scores VALUES (20, 2, NULL);
INSERT INTO scores VALUES (30, 3, 5);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON DATABASE portal TO root;