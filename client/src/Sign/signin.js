import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./signin.css";
import md5 from "./md5";

const Login = (props) => {
  const navigate = useNavigate();
  // State Variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Set Page Title
    document.title = "Login";
  });

  // Submit Button
  const onSubmit = (event) => {
    event.preventDefault();

    // Validations
    // Email
    if (email.length === 0) {
      alert("Please fill your email address!");
      return;
    }
    // (randomString)@(randomString2).(2-3 characters)
    const emailValidator = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (!emailValidator.test(email)) {
      alert("Please input a valid email address!");
      setEmail("");
      return;
    }
    // Password should >= 6 characteres
    if (password.length === 0) {
      alert("Please fill the password!");
      return;
    }
    if (password.length < 6) {
      alert("Please use a password >= 6 characters!");
      setPassword("");
      return;
    }

    var data = {
      email: email,
      password: md5(password),
    };
    // console.log(data);

    axios
      .post("/login", data, { withCredentials: true })
      .then((res) => {
        if (res.data === "Login!") {
          navigate("/");
        } else if (
          res.data ===
          "You have already signed in! Please log out before using another account."
        ) {
          alert(res.data);
          navigate("/");
        } else {
          alert(res.data);
        }
      })
      .catch((err) => console.log(err.data));
  };

  // onChange Functions
  const emailChange = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };
  const passwordChange = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  return (
    <div id="login">
      <h1>Login</h1>
      <form>
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
          Login
        </button>
      </form>
      <p>
        Don't have an account? <a href="/register">Sign up</a>
      </p>
      <a href="/reset">Forget the password?</a>
    </div>
  );
};

export default Login;
