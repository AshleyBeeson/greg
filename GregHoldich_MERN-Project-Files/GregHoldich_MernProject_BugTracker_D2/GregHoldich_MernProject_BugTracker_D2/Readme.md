//Setup
whilst in current directory:
npm i
run start-mongodb.bat script file (may need to run twise if window does not stay open)
look at mongodbs scripts.txt for a list of commands i used to set up my mongodb

import the json file located in data/bugs.json using the following commands
mongoimport -d bugtracker -c bugs --jsonArray < data/bugs.json

To start the server simply run "npm start" which will use forman to concurrently run both the API and client website.

To see the bug tracker, once the website is online, visit http://localhost:8080/