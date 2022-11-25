const express = require('express');
const router = express.Router();
const {
	createEvent,
	getAllEvents,
	getEvent,
	rsvp,
	getMyEventsAttending,
	getMyEventsHosting,
} = require('../controllers/event');

router.route('/').get(getAllEvents).post(createEvent);
router.route('/:id').get(getEvent)
router.route('/:event_id/rsvp').patch(rsvp);
router.route('/user/attending').get(getMyEventsAttending);
router.route('/user/hosting').get(getMyEventsHosting);

module.exports = router;