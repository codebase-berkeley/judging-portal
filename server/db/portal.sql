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

-- CREATE TABLE judges
-- (
--   name VARCHAR(254),
--   API VARCHAR(254),
--   projectId integer,
--   score integer
-- );

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

INSERT INTO projects VALUES (1, 'mentored', 'https://github.com/codebase-berkeley/judging-portal', '{"best team", "funnest team", "coolest team"}');
INSERT INTO projects VALUES (2, 'calhacks', 'https://github.com/codebase-berkeley/', '{"biggest hackathon"}');

-- INSERT INTO judges VALUES ('lawrence', 'codebaseAPI', '1', '-1');
-- INSERT INTO judges VALUES ('lawrence', 'codebaseAPI', '2', '-1');
-- INSERT INTO judges VALUES ('parth', 'codebaseAPI', '2', '-1');
-- INSERT INTO judges VALUES ('calhacks', 'calhacksAPI', '1', '-1');

INSERT INTO dataentry VALUES ('5', '3', '10', 'devpost');

INSERT INTO judges VALUES ('rachel', 'myAPI');
INSERT INTO judges VALUES ('parth', 'codebaseAPI');
INSERT INTO judges VALUES ('andrew', 'yoooAPI');
INSERT INTO judges VALUES ('julia', 'bestAPI');

INSERT INTO apis VALUES ('myAPI');
INSERT INTO apis VALUES ('codebaseAPI');
INSERT INTO apis VALUES ('yoooAPI');
INSERT INTO apis VALUES ('bestAPI');

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON DATABASE portal TO root;