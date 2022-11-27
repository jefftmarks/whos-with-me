import { set } from "mongoose";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const states = [
	'AL', 'AK', 'AZ', 'AR', 'AS', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'TT', 'UT', 'VT', 'VA', 'VI', 'WA', 'WV', 'WI', 'WY',
];

const tzOffset = (new Date()).getTimezoneOffset() * 60000;
const today = (new Date(Date.now() - tzOffset)).toISOString().slice(0, 16);

const initialState = {
	name: "",
	date: today,
	location: {
		street: "",
		city: "",
		state: "",
		zip_code: "",
	},
};

function EventForm() {
	const [formData, setFormData] = useState(initialState);

	const navigate = useNavigate();

	function handleChange(e) {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	}

	function handleChangeLocation(e) {
		const { name, value } = e.target;
		setFormData({ ...formData, location: {
			...formData.location, [name]: value,
		}});
	}

	function handleSubmit(e) {
		e.preventDefault();
		const token = localStorage.getItem("jwt");
		if (token) {
			const submitEvent = async () => {
				const res = await fetch("/events", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"authorization": `Bearer ${token}`,
					},
					body: JSON.stringify(formData),
				});
				if (res.ok) {
					const data = await res.json();
					setFormData(initialState);
					navigate("/");
				} else {
					const data = await res.json();
					console.log(data);
				}
			}
			submitEvent();
		}
	}

	return (
		<div className="event-form">
			<h1>Create Event</h1>
			<Link to="/"><button>Back Home</button></Link>
			<form onSubmit={handleSubmit}>
				<input
					required
					type="text"
					name="name"
					placeholder="Event Name"
					value={formData.name}
					onChange={handleChange}
				/>
				<input
					required
					type="datetime-local"
					name="date"
					value={formData.date}
					onChange={handleChange}
				/>
				<input
					required
					type="text"
					name="street"
					placeholder="Street"
					value={formData.location.street}
					onChange={handleChangeLocation}
				/>
				<input
					required
					type="text"
					name="city"
					placeholder="city"
					value={formData.location.city}
					onChange={handleChangeLocation}
				/>
				<select
					required
					name="state"
					value={formData.location.state}
					onChange={handleChangeLocation}
				>
					<option disabled value="">State</option>
					{states.map(state => (
						<option key={state} value={state}>{state}</option>
					))}
				</select>
				<input
					required
					type="number"
					name="zip_code"
					placeholder="Zip Code"
					value={formData.zip_code}
					onChange={handleChangeLocation}
					pattern="/^[0-9]{5}(?:-[0-9]{4})?$/"
				/>
				<button>Submit</button>
			</form>
		</div>
	);
}

export default EventForm;