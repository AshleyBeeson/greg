'use strict';

const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = new express();
const router = require('./router');

//server configuration
const serverConfig = require('../config/server.config');

//static files
const staticPath = __dirname + '/public';
app.use(express.static(staticPath));

// express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//mongodb connection
mongoose.Promise = global.Promise;
mongoose.connect(serverConfig.mongoURL, { useMongoClient: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

// parse application/json 
app.use(bodyParser.json()); 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //and remove cacheing so we get the most recent bugs
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//initialise router
router(app)

// launch API server on specified port from config file
app.listen(serverConfig.port, (error) => {
  if (!error) {
	console.log(`Launched API server at: http://localhost:${serverConfig.port}/`); // eslint-disable-line
  }
});
