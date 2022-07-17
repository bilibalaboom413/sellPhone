import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./activation.css";

const Activation = (props) => {
	const [message, setMessage] = useState("");
	const { id } = useParams();

	useEffect(() => {
		axios
			.post("/register/" + id)
			.then((res) => {
				setMessage(res.data);
				if (message === "Sorry! Page Not Found") {
					document.title = "Page Not Found";
				} else {
					document.title = "Activated!";
				}
			})
			.catch((err) => {
				console.log(err.data);
			});
	}, []);

	return (
		<div id="activate">
			<h1>{message}</h1>
		</div>
	);
};

export default Activation;
