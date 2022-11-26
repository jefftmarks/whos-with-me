import React, { useState, useEffect, useContext } from "react";
import { ActiveUserContext } from "./context/active_user";
import EventCard from "./EventCard";

function AllEvents() {
	const [events, setEvents] = useState([]);
	const [activeUser, setActiveUser] = useContext(ActiveUserContext);

	useEffect(() => {
		const token = localStorage.getItem("jwt");
		if (token) {
			const getEvents = async () => {
				const res = await fetch(`/events`, {
					headers: {
						"authorization": `Bearer ${token}`,
					},
				});
				const data = await res.json();
				setEvents(data);
			}
			getEvents();
		}
	}, [activeUser]);


	return (
		<div className="all-events">
			<h1>All Events</h1>
			{events.map(event => (
					<EventCard
						key={event._id}
						event={event}
						section="all-events"
					/>
				))}
		</div>
	);
}

export default AllEvents;