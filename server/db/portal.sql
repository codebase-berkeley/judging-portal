DROP DATABASE IF EXISTS portal;

CREATE DATABASE portal;

CREATE USER root
WITH ENCRYPTED PASSWORD 'password';

\c portal;
CREATE TABLE judges
(
  name VARCHAR(254),
  API VARCHAR(254),
  judgeId INTEGER PRIMARY KEY,
  score INTEGER
);

CREATE TABLE projects
(
  id INTEGER PRIMARY KEY,
  name VARCHAR(254),
  github VARCHAR(254),
  categories VARCHAR(254)[],
  judgeId INTEGER REFERENCES judges(judgeId)
);

CREATE TABLE lists
(
  api VARCHAR(254),
  fellowships VARCHAR(254),
  general VARCHAR(254)
);

INSERT INTO judges VALUES ('lawrence', 'codebaseAPI', 10, -1);
INSERT INTO judges VALUES ('parth', 'codebaseAPI', 20, -1);
INSERT INTO judges VALUES ('calhacks', 'calhacksAPI', 30, -1);

INSERT INTO projects VALUES (1, 'mentored', 'https://github.com/codebase-berkeley/judging-portal', '{"best team", "funnest team", "coolest team"}', 30);
INSERT INTO projects VALUES (2, 'calhacks', 'https://github.com/codebase-berkeley/', '{"biggest hackathon"}', 20);
INSERT INTO projects VALUES (3, 'atlassian', 'https://github.com/codebase-berkeley/', '{"lit team"}', 10);

INSERT INTO lists (API) VALUES ('Google Vision');
INSERT INTO lists (API) VALUES ('Uber Autopilot');
INSERT INTO lists (API) VALUES ('API #23');
INSERT INTO lists (fellowships) VALUES ('UCB Golden Bear Fellowship');
INSERT INTO lists (general) VALUES ('worst project');
INSERT INTO lists (general) VALUES ('most average project');

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON DATABASE portal TO root;