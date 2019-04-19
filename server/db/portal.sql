DROP DATABASE IF EXISTS portal;

CREATE DATABASE portal;

CREATE USER root
WITH ENCRYPTED PASSWORD 'password';

\c portal;
CREATE TABLE projects
(
  id integer PRIMARY KEY,
  name VARCHAR(254),
  github VARCHAR(254),
  categories VARCHAR(254)[]
);

CREATE TABLE judges
(
  name VARCHAR(254),
  API VARCHAR(254)
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
  api VARCHAR(254),
  fellowships VARCHAR(254),
  general VARCHAR(254)
);

CREATE TABLE csv
(
  projectname VARCHAR(254),
  projecturl VARCHAR(254),
  bestmobileapp VARCHAR(254),
  bestwebapp VARCHAR(254),
  besthardware VARCHAR(254),
  bestvr VARCHAR(254),
  bestml VARCHAR(254),
  besthealth VARCHAR(254),
  besteducation VARCHAR(254),
  bestentertainment VARCHAR(254),
  bestbeginner VARCHAR(254)
);

INSERT INTO projects VALUES (1, 'mentored', 'https://github.com/codebase-berkeley/judging-portal', '{"best team", "funnest team", "coolest team"}');
INSERT INTO projects VALUES (2, 'calhacks', 'https://github.com/codebase-berkeley/', '{"biggest hackathon"}');

INSERT INTO dataentry VALUES (0, 0, 0, 'UPLOAD FILE');

INSERT INTO judges VALUES ('rachel', 'myAPI');
INSERT INTO judges VALUES ('parth', 'codebaseAPI');
INSERT INTO judges VALUES ('andrew', 'yoooAPI');
INSERT INTO judges VALUES ('julia', 'bestAPI');

INSERT INTO lists (API) VALUES ('Google Vision');
INSERT INTO lists (API) VALUES ('Uber Autopilot');
INSERT INTO lists (API) VALUES ('API #23');

INSERT INTO lists (fellowships) VALUES ('UCB Golden Bear Fellowship');

INSERT INTO lists (general) VALUES ('worst project');
INSERT INTO lists (general) VALUES ('most average project');

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON DATABASE portal TO root;