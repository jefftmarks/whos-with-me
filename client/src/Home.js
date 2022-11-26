import React, { useContext } from "react";
import { ActiveUserContext } from "./context/active_user";
import MyEvents from "./MyEvents";
import AllEvents from "./AllEvents";

function Home() {
	const [activeUser, setActiveUser] = useContext(ActiveUserContext);

	function handleLogout() {
		localStorage.clear();
		setActiveUser(null);
	}

	return (
		<div className="home">
			<div className="header">
				<h1>Home</h1>
				<p>Hello there {activeUser.first_name}</p>
				<button onClick={handleLogout}>Sign Out</button>
			</div>
			<MyEvents />
			<AllEvents />
		</div>
		
	);
}

export default Home;