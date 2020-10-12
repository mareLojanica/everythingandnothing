const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Picture = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	name: {
		type: String,
	},
	path :{
		type: String,
	},
likes: [
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'users'
		}
	}
],
comments: [
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'users'
		},
		text: {
			type: String,
			required: true
		},
		name: {
			type: String
		},
		avatar: {
			type: String
		},
		date: {
			type: Date,
			default: Date.now
		}
	}
],
date: {
		type: Date,
		default: Date.now
	}
});

module.exports = User = mongoose.model('picture', Picture);
