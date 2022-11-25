import React, { useState, useContext } from "react";
import { ActiveUserContext } from "./context/active_user";

const initialState = { first_name: "", last_name: "", email: "", username: "", password: "" };

function RegisterForm() {
	const [activeUser, setActiveUser] = useContext(ActiveUserContext);
	const [formData, setFormData] = useState(initialState);
	const [error, setError] = useState(null);

	function handleChange(e) {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value});
	}

	function handleSubmit(e) {
		e.preventDefault();
		const registerUser = async () => {
			const res = await fetch("/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
			if (res.ok) {
				const data = await res.json();
				localStorage.setItem("jwt", data.token);
				setActiveUser(data.user);
				setFormData(initialState);
			} else {
				const data = await res.json();
				setError(data.msg);
			}
		}
		registerUser();
	}


	return (
		<div className="register-form">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="first_name"
					placeholder="first name"
					onChange={handleChange}
					value={formData.first_name}
					required
				/>
				<input
					type="text"
					name="last_name"
					placeholder="last name"
					onChange={handleChange}
					value={formData.last_name}
					required
				/>
				<input
					type="email"
					name="email"
					placeholder="email"
					onChange={handleChange}
					value={formData.email}
					required
				/>
				<input
					type="text"
					name="username"
					placeholder="username"
					onChange={handleChange}
					value={formData.username}
					required
				/>
				<input
					type="password"
					name="password"
					placeholder="password"
					onChange={handleChange}
					value={formData.password}
					required
				/>
				<button>Register</button>
			</form>
			{error ? <p>{error}</p> : null}
		</div>
	);
}

export default RegisterForm;