import React, { useEffect, useState, useContext } from "react";
import { ActiveUserContext } from "./context/active_user";
import EventCard from "./EventCard";

function MyEvents() {
	const [events, setEvents] = useState([]);
	const [filter, setFilter] = useState("hosting");
	const [activeUser, setActiveUser] = useContext(ActiveUserContext);

	useEffect(() => {
		const token = localStorage.getItem("jwt");

		if (token) {
			const getEvents = async () => {
				const res = await fetch(`/events/user/${filter}`, {
					headers: {
						"authorization": `Bearer ${token}`,
					},
				});
				const data = await res.json();
				setEvents(data);
			}
			getEvents();
		}
	}, [filter, activeUser]);

	return (
		<div className="my-events">
			<h1>My Events</h1>
			<div className="filter">
				<input
					type="radio"
					id="hosting"
					name="filter"
					value="hosting"
					checked={filter === "hosting"}
					onChange={() => setFilter("hosting")}
				/>
				<label htmlFor="hosting">Hosting</label>
				<input
					type="radio"
					id="attending"
					name="filter"
					value="attending"
					checked={filter === "attending"}
					onChange={() => setFilter("attending")}
				/>
				<label htmlFor="attending">Attending</label>
			</div>
			<div className="events-container">
				{events.map(event => (
					<EventCard
						key={event._id}
						event={event}
						section="my-events"
					/>
				))}
			</div>
		</div>
	);
}

export default MyEvents;