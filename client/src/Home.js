import React, { useContext } from "react";
import { Link } from "react-router-dom";
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
			<Link to="/event/new"><button>Create Event</button></Link>
		</div>
		
	);
}

export default Home;