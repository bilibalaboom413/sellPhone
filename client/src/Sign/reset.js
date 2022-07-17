import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./reset.css";

const Reset = (props) => {
  const navigate = useNavigate();
  // State Variables
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Set Page Title
    document.title = "Reset Password";
  });

  const emailChange = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

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
      return;
    }

    var data = {
      email: email,
    };
    axios
      .post("/reset", data)
      .then((res) => {
        alert(res.data);
        // Redirect to login page
        navigate("/login");
      })
      .catch((err) => console.log(err.data));
  };

  return (
    <div id="reset">
      <h1>Forget Password</h1>
      <form>
        <input
          type="text"
          name="email"
          placeholder="Email"
          required="required"
          value={email}
          onChange={emailChange}
        />
        <button type="submit" onClick={onSubmit}>
          Reset
        </button>
      </form>
      <a href="/login">Login instead?</a>
    </div>
  );
};

export default Reset;
