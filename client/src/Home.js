import React, { useContext } from "react";
import { ActiveUserContext } from "./context/active_user";

function Home() {
	const [activeUser, setActiveUser] = useContext(ActiveUserContext);

	function handleLogout() {
		localStorage.clear();
		setActiveUser(null);
	}

	return (
		<div className="home">
			<h1>Home</h1>
			<p>Hello there {activeUser.first_name}</p>
			<button onClick={handleLogout}>Sign Out</button>
		</div>
	);
}

export default Home;