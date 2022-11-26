const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
	street: {
		type: String,
		required: [true, 'Please provide a street address or location name'],
	},
	city: {
		type: String,
		required: [true, 'Please provide a city']
	},
	state: {
		type: String,
		required: [true, 'Please provide a state'],
		enum: [
			'AL', 'AK', 'AZ', 'AR', 'AS', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'TT', 'UT', 'VT', 'VA', 'VI', 'WA', 'WV', 'WI', 'WY',
		],
	},
	zip_code: {
		type: Number,
		required: [true, 'Please provide a zip code'],
		match: [/^[0-9]{5}(?:-[0-9]{4})?$/, 'Please provide valid zip code'],
	},
});

const EventSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please provide a name for your event'],
	},
	date: {
		type: Date,
		required: [true, 'Please provide a date and time for your event']
	},
	location: LocationSchema,
	created_by: {
		type: mongoose.Types.ObjectId,
		ref: 'User',
		required: [true, 'Please provide user'],
	},
	attendees: [{
		type: mongoose.Types.ObjectId,
		ref: 'User'
	}],
}, {timestamps: true});

module.exports = mongoose.model('Event', EventSchema);