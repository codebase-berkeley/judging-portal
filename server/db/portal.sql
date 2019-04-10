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
  name VARCHAR(254) PRIMARY KEY,
  API VARCHAR(254),
  projects VARCHAR[][]
);

INSERT INTO projects VALUES (1, 'mentored', 'https://github.com/codebase-berkeley/judging-portal', '{"best team", "funnest team", "coolest team"}');
INSERT INTO projects VALUES (2, 'calhacks', 'https://github.com/codebase-berkeley/', '{"biggest hackathon"}');

INSERT INTO judges VALUES ('lawrence', 'codebaseAPI', '{{1, ?}, {2, ?}}');
INSERT INTO judges VALUES ('parth', 'codebaseAPI', '{{2, ?}}');
INSERT INTO judges VALUES ('calhacks', 'calhacksAPI', '{{1, ?}}');

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO root;

GRANT ALL PRIVILEGES ON DATABASE portal TO root;