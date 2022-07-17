import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import "./reset2.css";
import md5 from "./md5";

const Reset2 = (props) => {
	const navigate = useNavigate();
	const { id } = useParams();
	// State Variables
	const [display, setDisplay] = useState(false);
	const [message, setMessage] = useState("");
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");

	useEffect(() => {
		axios
			.post("/reset/" + id)
			.then((res) => {
				setMessage(res.data);
				if (message === "Sorry! Page Not Found") {
					document.title = "Page Not Found";
					setDisplay(false);
				} else {
					document.title = message;
					setDisplay(true);
				}
			})
			.catch((err) => {
				console.log(err.data);
			});
	});

	// Submit Button
	const onSubmit = (event) => {
		event.preventDefault();

		// Validations
		// Password should >= 6 characteres
		if (password.length === 0) {
			alert("Please fill the password!");
			return;
		}
		if (confirm.length === 0) {
			alert("Please confirm your new password!");
		}
		if (password.length < 6) {
			alert("Please use a password >= 6 characters!");
			return;
		}
		if (password !== confirm) {
			alert("The two passwords don't match!");
			return;
		}

		var data = {
			id: id,
			password: md5(password),
		};
		axios
			.post("/resetpassword", data)
			.then((res) => {
				alert(res.data);
				// Redirect to login page
				navigate("/login");
			})
			.catch((err) => {
				console.log(err.data);
			});
	};

	// onChange Functions
	const passwordChange = (event) => {
		event.preventDefault();
		setPassword(event.target.value);
	};
	const confirmChange = (event) => {
		event.preventDefault();
		setConfirm(event.target.value);
	};

	// If the link doesn't exist
	if (display === false) {
		return (
			<div id="reset2">
				<h1>Page Not Found</h1>
			</div>
		);
	}

	return (
		<div id="reset2">
			<h1>Change Password</h1>
			<form>
				<input
					type="password"
					name="password"
					placeholder="New Password"
					required="required"
					maxLength="30"
					value={password}
					onChange={passwordChange}
				/>
				<input
					type="password"
					name="confirm"
					placeholder="Confirm Password"
					required="required"
					maxLength="30"
					value={confirm}
					onChange={confirmChange}
				/>
				<button type="submit" onClick={onSubmit}>
					Reset
				</button>
			</form>
		</div>
	);
};

export default Reset2;
