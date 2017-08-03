'use strict';
const express = require("express");
const router = express.Router();

const BugController = require('../controllers/bug.controller');

// Get all Bugs [GET]
router.route('/fetch').get(BugController.getBugs);
router.route('/fetch/:searchq').get(BugController.getBugsbySearch);

// Put one Bug by Bug_id [PUT]
router.route('/update/:bug_id').put(BugController.updateBug);

// Add a new Bug [POST]
router.route('/add').post(BugController.addBug);

// Delete a Bug by Bug_id [DELETE]
router.route('/delete/:bug_id').delete(BugController.deleteBug);

exports = module.exports = router;
