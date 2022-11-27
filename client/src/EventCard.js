import React, { useContext } from "react";
import { ActiveUserContext } from "./context/active_user";

function EventCard({ event, section}) {
	const date = new Date(event.date);
	const [activeUser, setActiveUser] = useContext(ActiveUserContext);

	const handleRSVP = async () => {
		const token = localStorage.getItem("jwt");

		if (token) {
			const res = await fetch(`/events/${event._id}/rsvp`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					"authorization": `Bearer ${token}`
				},
			});
			if (res.ok) {
				const data = await res.json();
				setActiveUser(data.user);
			} else {
				const data = await res.json();
				console.log(data);
			}	
		}
	}

	const handleCancelRSVP = async () => {
		const token = localStorage.getItem("jwt");

		if (token) {
			const res = await fetch(`/events/${event._id}/cancel_rsvp`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					"authorization": `Bearer ${token}`
				},
			});
			if (res.ok) {
				const data = await res.json();
				setActiveUser(data.user);
			} else {
				const data = await res.json();
				console.log(data);
			}	
		}
	}

	const handleCancelEvent = async () => {
		const token = localStorage.getItem("jwt");

		if (token) {
			const res = await fetch(`/events/${event._id}`, {
				method: "DELETE",
				headers: {
					"authorization": `Bearer ${token}`,
				},
			});
			if (res.ok) {
				const data = await res.json();
				setActiveUser(data);
			} else {
				const data = await res.json();
				console.log(data);
			}
		}
	}

	function renderButton() {
		switch (section) {
			case "my-events":
				return (
					event.isHosting ? (
						<button onClick={handleCancelEvent}>Cancel Event</button>
					) : (
						<button onClick={handleCancelRSVP}>Cancel RSVP</button>
					)
				);
			case "all-events":
				return (
					event.isAttending ? (
						<em>{event.isHosting ? "hosting" : "attending"}</em>
					) : (
						<button onClick={handleRSVP}>RSVP</button>
					)
				);
		}
	}

	return (
		<div className="event-card">
			<p>{event.name}</p>
			<p>{date.toDateString()} at {date.toLocaleTimeString()}</p>
			{renderButton()}
		</div>
	);
}

export default EventCard;