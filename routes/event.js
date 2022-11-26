const express = require('express');
const router = express.Router();
const {
	createEvent,
	getAllEvents,
	getEvent,
	rsvp,
	cancelRSVP,
	deleteEvent,
	getMyEventsAttending,
	getMyEventsHosting,
} = require('../controllers/event');

router.route('/').get(getAllEvents).post(createEvent);
router.route('/:id').get(getEvent).delete(deleteEvent);
router.route('/:event_id/rsvp').patch(rsvp);
router.route('/:event_id/cancel_rsvp').patch(cancelRSVP);
router.route('/user/attending').get(getMyEventsAttending);
router.route('/user/hosting').get(getMyEventsHosting);

module.exports = router;