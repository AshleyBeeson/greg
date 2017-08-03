'use strict';
const express = require("express");

module.exports = (app) => {
  const apiRoutes = express.Router();
  
  // configure routes
  const bugs = require('./routes/bugs.routes');
  
  //==============
  // CRUD Routes =
  //==============
  apiRoutes.use('/bugs', bugs);
  
  // all routes
  app.use('/api', apiRoutes);
}
