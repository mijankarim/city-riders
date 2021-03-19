import React, { useState, useContext } from "react";

import { Form, Button } from "react-bootstrap";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import {
  handleGoogleSignIn,
  initializeLoginFramework,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "./loginManager";

const Login = () => {
  const [newUser, SetNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
    success: false,
    error: "",
  });
  initializeLoginFramework();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
        handleResponse(res, true);
    });
  };


  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
  };

  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password).then(
        (res) => {
            handleResponse(res, true);
        }
      );
    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password).then((res) => {
        handleResponse(res, true);
      });
    }
    e.preventDefault();
  };

  return (
    <div className="form-container mx-auto border border-dark px-4 py-4 my-4">
      <h3 className="mb-3 text-center">
        {newUser ? "Create an account" : "Sign In"}
      </h3>

      <Form onSubmit={handleSubmit}>
        {newUser && (
          <Form.Group controlId="formBasicName">
            <Form.Control
              onBlur={handleBlur}
              type="text"
              name="name"
              placeholder="Name"
            />
          </Form.Group>
        )}

        <Form.Group controlId="formBasicEmail">
          <Form.Control
            onBlur={handleBlur}
            type="email"
            name="email"
            placeholder="Email"
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Control
            onBlur={handleBlur}
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </Form.Group>

        {newUser && (
          <Form.Group controlId="formBasicPasswordConfirm">
            <Form.Control
              onBlur={handleBlur}
              type="password"
              name="password"
              placeholder="Confirm Password"
              required
            />
          </Form.Group>
        )}

        <Button variant="primary" type="submit">
          {newUser ? "Create an account" : "Sign In"}
        </Button>
      </Form>
      {user.error && (
        <p className="text-danger mt-3 text-center">{user.error}</p>
      )}
      {user.success && (
        <p className="text-success mt-3 text-center">
          User {newUser ? "Created" : "Logged In"} Successfully
        </p>
      )}
      <div className="text-center mt-3">
        {newUser ? "Already have an account?" : "Don't have an account"}
        <button
          className="text-decoration-underline border-0 bg-light"
          onClick={() => SetNewUser(!newUser)}
        >
          {newUser ? "Login" : "Create an account"}
        </button>
      </div>

      <div className="text-center my-3">
        <button onClick={googleSignIn}>Login Using Google</button>
      </div>

    
    </div>
  );
};

export default Login;
