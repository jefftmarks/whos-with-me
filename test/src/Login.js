import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function Login() {
	const [hasAccount, setHasAccount] = useState(true);

	return (
		<div className="login">
			{hasAccount ? <LoginForm /> : <RegisterForm />}
			<button
				onClick={() => setHasAccount(hasAccount => !hasAccount)}
			>
				{hasAccount ? "Create Account" : "Back to Login" }
			</button>
		</div>
	);
}

export default Login;