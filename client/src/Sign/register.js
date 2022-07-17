import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./register.css";
import md5 from "./md5";

const Register = (props) => {
	const navigate = useNavigate();
	// State Variables
	const [firstname, setFirstName] = useState("");
	const [lastname, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		// Set Page Title
		document.title = "Sign Up";
	});

	// Submit Button
	const onSubmit = (event) => {
		event.preventDefault();

		// Validations
		if (firstname.length === 0) {
			alert("Please fill your first name!");
			return;
		}
		if (lastname.length === 0) {
			alert("Please fill your last name!");
			return;
		}
		const alphabetical = new RegExp("^[A-Za-z]+$"); // Letters only and > 1 char
		if (!alphabetical.test(firstname)) {
			alert("You can only use letters in First Name!");
			return;
		}
		if (!alphabetical.test(lastname)) {
			alert("You can only use letters in Last Name!");
			return;
		}
		// Email
		if (email.length === 0) {
			alert("Please fill your email address!");
			return;
		}
		// (randomString)@(randomString2).(2-3 characters)
		const emailValidator = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
		if (!emailValidator.test(email)) {
			alert("Please input a valid email address!");
			return;
		}
		// Password should >= 6 characteres
		if (password.length === 0) {
			alert("Please fill the password!");
			return;
		}
		if (password.length < 6) {
			alert("Please use a password >= 6 characters!");
			return;
		}

		var data = {
			firstname: firstname,
			lastname: lastname,
			email: email,
			password: md5(password),
		};
		// console.log(data);
		axios
			.post("/register", data)
			.then((res) => {
				alert(res.data);
				if (
					res.data ===
					"The activation link has been sent. Please check your inbox to proceed!"
				) {
					// Redirect to login page
					navigate("/login");
				}
			})
			.catch((err) => console.log(err.data));
	};

	// onChange Functions
	const firstnameChange = (event) => {
		event.preventDefault();
		setFirstName(event.target.value);
	};
	const lastnameChange = (event) => {
		event.preventDefault();
		setLastName(event.target.value);
	};
	const emailChange = (event) => {
		event.preventDefault();
		setEmail(event.target.value);
	};
	const passwordChange = (event) => {
		event.preventDefault();
		setPassword(event.target.value);
	};

	return (
		<div id="sign">
			<h1>Sign Up</h1>
			<form>
				<input
					type="text"
					name="firstName"
					placeholder="First Name"
					required="required"
					maxLength="30"
					value={firstname}
					onChange={firstnameChange}
				/>
				<input
					type="text"
					name="lastName"
					placeholder="Last Name"
					required="required"
					maxLength="30"
					value={lastname}
					onChange={lastnameChange}
				/>
				<input
					type="email"
					name="email"
					placeholder="Email"
					required="required"
					value={email}
					onChange={emailChange}
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					required="required"
					maxLength="30"
					value={password}
					onChange={passwordChange}
				/>
				<button type="submit" onClick={onSubmit}>
					Register
				</button>
			</form>
			<a href="/login">Login instead?</a>
		</div>
	);
};

export default Register;
