'use strict';
const Bugs = require('../models/bugs');
const sanitizeHtml = require('sanitize-html');


	/**
	 * Get all bugs
	 * @param req
	 * @param res
	 * @returns void
	 */
	exports.getBugs = (req, res) => {
    Bugs.find((err, bugs) => {
		if (err) {
		  res.status(500).send(err);
		}
		res.json({ bugs });
	  });
	}
	
	exports.getBugsbySearch = (req, res) => {
    Bugs.find({ $text: { $search: req.params.searchq }}, (err, bugs) => {
		if (err) {
		  res.status(500).send(err);
		}
		res.json({ bugs });
	  });
	}

	/**
	 * Save a bug
	 * @param req
	 * @param res
	 * @returns void
	 */
	exports.addBug = (req, res) => {
	  if (!req.body.author || !req.body.text) {
		res.status(403).end();
	  }
	 var bug = new Bugs();
      (req.body.status) ? bug.status = sanitizeHtml(req.body.status) : null;
      (req.body.highPriority) ? bug.highPriority = sanitizeHtml(req.body.highPriority) : null;
      (req.body.severity) ? bug.severity = sanitizeHtml(req.body.severity) : null;
      (req.body.assignedUser) ? bug.assignedUser = sanitizeHtml(req.body.assignedUser) : null;
      (req.body.summary) ? bug.summary = sanitizeHtml(req.body.summary) : null;
      (req.body.description) ? bug.description = sanitizeHtml(req.body.description) : null;

	  bug.save((err, saved) => {
		if (err) {
		  res.status(500).send(err);
		}
		res.json({ message: 'Bug successfully added!' });
	  });
	}

	/**
	 * Update a single bug
	 * @param req
	 * @param res
	 * @returns void
	 */
	exports.updateBug = (req, res) => {
	Bugs.findOne({ id:{ $eq: req.params.bug_id } }, (err, bug) => {
		if (err) {
		  res.status(500).send(err);
		}
      (req.body.status) ? bug.status = sanitizeHtml(req.body.status) : null;
      (req.body.highPriority) ? bug.highPriority = sanitizeHtml(req.body.highPriority) : null;
      (req.body.severity) ? bug.severity = sanitizeHtml(req.body.severity) : null;
      (req.body.assignedUser) ? bug.assignedUser = sanitizeHtml(req.body.assignedUser) : null;
      (req.body.summary) ? bug.summary = sanitizeHtml(req.body.summary) : null;
      (req.body.description) ? bug.description = sanitizeHtml(req.body.description) : null;
      bug.save((err) => {
		if (err) {
		  res.status(500).send(err);
		}
        res.json({ message: 'Bug has been updated' });
      });
    });	
	}

	/**
	 * Delete a bug
	 * @param req
	 * @param res
	 * @returns void
	 */
	exports.deleteBug = (req, res) => {
	 Bugs.remove({ id:{ $eq: req.params.bug_id } }, (err, bug) => {
		if (err) {
		  res.status(500).send(err);
		}
		res.json({ message: 'Bug has been deleted' });
    });
	}
