//Required installs
Node version (Latest LTS Version: v6.11.1 (includes npm 3.10.10))
MongoDB version 3.2 (As the batch script created requires the path to be the same, unless changed manually)

//Setup
1) Open a CMD window and navigate to the project root directory
2) Enter the command: 'npm i'
3) Double-click(run) the provided batch script: 'start-mongodb.bat' (may need to run twise if window does not stay open)
4) Read the text file: 'mongodbs scripts.txt' (for a list of commands i used to set up my mongodb)
5) Import the JSON file located in data/bugs.json using the following approach (NOTE: Original JSON File has been altered so that it works as intended with MongoDB)
	- Copy the folder 'data' which contains bugs.json to your MongoDB bin directory (EG: 'C:\Program Files\MongoDB\Server\3.2\bin')
	- Open a new CMD window
	- Navigate to the MongoDB bin directory in command-line (EG: 'cd C:\Program Files\MongoDB\Server\3.2\bin')
	- Enter the command: 'mongoimport -d bugtracker -c bugs --jsonArray < data/bugs.json'
	- After running the command you should recieve the message 'imported 6 documents'
6) Finally add the user from the text file: 'mongodbs scripts.txt' to the database.
To start the webapp simply run 'npm start' from the root directory in command-line which will execute the foreman module to concurrently run both the server-side API and client-side website automatically.

To see the bug tracker, once the website is online, visit http://localhost:8080/