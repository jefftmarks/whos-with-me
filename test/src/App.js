import React, { useState, useContext, useEffect } from "react";
import { ActiveUserContext } from "./context/active_user";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";

function App() {
	const [activeUser, setActiveUser] = useContext(ActiveUserContext);

	useEffect(() => {
		const token = localStorage.getItem("jwt");

		if (token) {
			const getProfile = async () => {
				const res = await fetch("/auth/profile", {
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
			getProfile();
		}

	}, [setActiveUser]);


  return (
    <div className="App">
      <Routes>
				<Route path="/" element={activeUser ? <Home /> : <Login />} />
			</Routes>
    </div>
  );
}

export default App;
