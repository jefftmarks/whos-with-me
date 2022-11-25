import React, { useState, useContext } from "react";
import { ActiveUserContext } from "./context/active_user";

const initialState = { username: "", password: "" };

function LoginForm() {
	const [activeUser, setActiveUser] = useContext(ActiveUserContext);
	const [formData, setFormData] = useState(initialState);
	const [error, setError] = useState(null);

	function handleChange(e) {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value});
	}

	function handleSubmit(e) {
		e.preventDefault();
		const loginUser = async () => {
			const res = await fetch("/auth/login", {
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
		loginUser();
	}


	return (
		<div className="login-form">
			<form onSubmit={handleSubmit}>
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
				<button>Sign In</button>
			</form>
			{error ? <p>{error}</p> : null}
		</div>
	);
}

export default LoginForm;