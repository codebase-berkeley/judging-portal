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
  type VARCHAR(254),
  name VARCHAR(254)
);

CREATE TABLE csv
(
  name VARCHAR(254),
  url VARCHAR(254),
  BestMobileApp VARCHAR(254),
  BestWebApp VARCHAR(254),
  BestHardwareHack VARCHAR(254),
  BestVRHack VARCHAR(254),
  BestMLHack VARCHAR(254),
  BestHealthHack VARCHAR(254),
  BestEducationHack VARCHAR(254),
  BestEntertainmentHack VARCHAR(254),
  BestBeginnerHack VARCHAR(254)
);

INSERT INTO projects VALUES (1, 'mentored', 'https://github.com/codebase-berkeley/judging-portal', '{"best team", "funnest team", "coolest team"}');
INSERT INTO projects VALUES (2, 'calhacks', 'https://github.com/codebase-berkeley/', '{"biggest hackathon"}');

INSERT INTO dataentry VALUES (0, 0, 0, '');

INSERT INTO judges VALUES ('rachel', 'myAPI');
INSERT INTO judges VALUES ('parth', 'codebaseAPI');
INSERT INTO judges VALUES ('andrew', 'yoooAPI');
INSERT INTO judges VALUES ('julia', 'bestAPI');

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

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON DATABASE portal TO root;
