import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";

const Login = () => {
  let inputRef = useRef();
  let history = useHistory();

  let initialState = {
    email: null,
    password: null,
  };

  const [formState, setFormState] = useState(initialState);

  const onHandleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const onLogin = (event) => {
    event.preventDefault();

    const { email, password } = formState;

    if (email === "sid@organicecommerce.com" && password === "12345678") {
      if (!window.localStorage.getItem("user_name"))
        window.localStorage.setItem("user_name", "Sid");

      history.push("/home");
    } else {
      alert("Login credential is not matched!");
    }
  };

  return (
    <div className="d-flex login-container">
      <div className="container">
        <div className="login-form">
          <figure></figure>
          <form onSubmit={(event) => onLogin(event)}>
            <h2>Welcome Back!</h2>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                ref={inputRef}
                type="email"
                name="email"
                className="form-control"
                placeholder="Email address"
                onChange={onHandleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                minLength="3"
                maxLength="10"
                className="form-control"
                placeholder="Password"
                onChange={onHandleChange}
              />
            </div>
            <div className="form-group d-flex justify-content-between">
              <label className="remember">
                <input type="checkbox" name="remember_me" />
                Remember Me
              </label>
              <Link to="./#">Forgot Your Password?</Link>
            </div>
            <button className="btn btn-primary">Sign in</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
