import React, { useEffect } from "react";

import "./signin.css";

const Login = (props) => {
  // Set Page Title
  useEffect(() => {
    document.title = "Login";
  });

  return (
    <div id="login">
      <h1>Login</h1>
      <form>
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
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/register">Sign up</a>
      </p>
      <a href="/reset">Forget the password?</a>
    </div>
  );
};

export default Login;
