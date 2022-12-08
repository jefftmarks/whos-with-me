import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "./login.css";

function Login() {
	const [hasAccount, setHasAccount] = useState(true);

	return (
		<div className="login">
			<div className="sidebar grid-item-1">sidebar</div>
			<div className="login-form grid-item-2">
				{hasAccount ? <LoginForm /> : <RegisterForm />}
				<button
					onClick={() => setHasAccount(hasAccount => !hasAccount)}
				>
					{hasAccount ? "Create Account" : "Back to Login" }
				</button>
			</div>
			<div className="grid-item-3">stuff</div>
		</div>
	);
}

export default Login;