import React, { useEffect } from "react";

import "./register.css";

const Register = (props) => {
  // Set Page Title
  useEffect(() => {
    document.title = "Sign Up";
  });

  return (
    <div id="sign">
      <h1>Sign Up</h1>
      <form>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          required="required"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          required="required"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required="required"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required="required"
        />
        <button type="submit">Register</button>
      </form>
      <a href="/login">Login instead?</a>
    </div>
  );
};

export default Register;
