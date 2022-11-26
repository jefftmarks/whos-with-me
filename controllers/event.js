const Event = require('../models/event');
const User = require('../models/user');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError, BadRequestError } = require('../errors');

const createEvent = async (req, res) => {
	req.body.created_by = req.user.userId;
	const event = await Event.create(req.body);
	event.attendees.push(req.user.userId);
	event.save();
	res.status(StatusCodes.CREATED).json(event);
};

const getAllEvents = async (req, res) => {
	const { name, date, host, sort } = req.query;
	const queryObject = {};

	if (name) {
		queryObject.name = { $regex: name, $options: 'i' };
	}

	if (date) {
		queryObject.date = date;
	}

	if (host) {

		const users = await User.find({
			$or: [
				{ first_name: { $regex: host, $options: 'i' } },
				{ last_name: { $regex: host, $options: 'i' } },
				{ username: { $regex: host, $options: 'i' } },
			]
		});

		queryObject.created_by = { $in: users} 
	}

	const events = await Event.find(queryObject).sort("date");

	events.forEach(event => {
		event._doc.isAttending = event.attendees.includes(req.user.userId);
	});

	res.status(StatusCodes.OK).json(events);
}

const getEvent = async (req, res) => {
	const event = await Event.findById(req.params.id).populate('attendees');

	if (!event) {
    throw new NotFoundError(`No event with id ${req.params.id}`);
  }

	res.status(StatusCodes.OK).json(event);
};

const rsvp = async (req, res) => {
	const event = await Event.findById(req.params.event_id);

	if (!event) {
    throw new NotFoundError(`No event with id ${req.params.event_id}`);
  }

	if (event.attendees.includes(req.user.userId)) {
		throw new BadRequestError("You've already RSVP'd for this event");
	}

	event.attendees.addToSet(req.user.userId);
	event.save();
	event._doc.isAttending = true;
	res.status(StatusCodes.OK).json({ event: event, user: req.user });
};

const cancelRSVP = async (req, res) => {
	await Event.updateOne(
		{ _id: req.params.event_id },
		{ $pull: { attendees: req.user.userId } }
	);

	const event = await Event.findById(req.params.event_id);

	if (!event) {
    throw new NotFoundError(`No event with id ${req.params.event_id}`);
  }

	res.status(StatusCodes.OK).json({ event: event, user: req.user });
};

const deleteEvent = async (req, res) => {
	const event = await Event.findByIdAndDelete(req.params.id);

	if (!event) {
    throw new NotFoundError(`No event with id ${req.params.id}`);
  }

	res.status(StatusCodes.OK).send(req.user);
};

const getMyEventsHosting = async (req, res) => {
	const events = await Event
		.find({ created_by: req.user.userId})
		.sort("date")
	
	if (!events) {
    throw new NotFoundError(`No events created by user with id ${req.user.userId}`);
  }

	events.forEach(event => event._doc.isHosting = true);

	res.status(StatusCodes.OK).json(events);
}

const getMyEventsAttending = async (req, res) => {
	const events = await Event.find({
		attendees: req.user.userId,
		created_by: { $ne: req.user.userId }
	}).sort("date");

	if (!events) {
    throw new NotFoundError(`No RSVPs for user with id ${req.user.userId}`);
  }

	events.forEach(event => event._doc.isAttending = true);

	res.status(StatusCodes.OK).json(events);
};

module.exports = {
	createEvent,
	getAllEvents,
	getEvent,
	rsvp,
	cancelRSVP,
	deleteEvent,
	getMyEventsAttending,
	getMyEventsHosting,
};