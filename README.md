## Hackathon Judging Portal

#### Deploy instructions
```
heroku create <name-of-app>
heroku addons:create heroku-postgresql:hobby-dev -a <name-of-app>
cat db/heroku.sql | heroku pg:psql -a <name-of-app>
git push heroku master
```
