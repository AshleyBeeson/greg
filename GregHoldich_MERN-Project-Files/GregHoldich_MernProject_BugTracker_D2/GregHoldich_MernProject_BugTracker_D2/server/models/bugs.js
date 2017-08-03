'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bugsSchema = new Schema({
	id: { type: Number, unique: true },
	issueId: { type: String, unique: true },
	dateCreated: { type: Date, default: Date.now },
	summary: String,
	description: String,
	highPriority: { 
			type: String,
			validate: function(value) {
				return /TRUE|FALSE/i.test(value);
		}
	},
	severity: { 
			type: String,
			validate: function(value) {
				return /HIGH|MEDIUM|LOW/i.test(value);
		}
	},
	reporter: String,
	assignedUser: String,
	actions: [
		{
			user: String,
			dateCreated: { type: Date, default: Date.now },
			action: String
		},
		{
			user: String,
			dateCreated: { type: Date, default: Date.now },
			action: String
		}
	],
	status: { type: String, enum: ['TO DO', 'IN PROGRESS', 'IN REVIEW', 'IN TEST', 'IN DEMO', 'DONE'] }
});

module.exports = mongoose.model('Bugs', bugsSchema);
