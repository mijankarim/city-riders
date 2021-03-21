import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { UserContext } from "../../App";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useHistory, useLocation } from "react-router";
import {
  createUserWithEmailAndPassword,
  handleGoogleSignIn,
  initializeLoginFramework,
  signInWithEmailandPassword,
} from "./loginManager";

initializeLoginFramework();

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

  const [validation, setValidation] = useState({
    emailValidation: "",
    passwordValidation: "",
  });

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password).then(
        (res) => {
          handleResponse(res, false);
        }
      );
    }

    if (!newUser && user.email && user.password) {
      signInWithEmailandPassword(user.email, user.password).then((res) => {
        handleResponse(res, true);
      });
    }
    e.preventDefault();
  };

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
      const isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
      if (!isFieldValid && e.target.value) {
        const newValidation = { ...validation };
        newValidation.email = "Email Is Not Valid";
        setValidation(newValidation);
      } else {
        const newValidation = { ...validation };
        newValidation.email = "";
        setValidation(newValidation);
      }
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
      if (!isFieldValid && e.target.value) {
        const newValidation = { ...validation };
        newValidation.password =
          "Password should more than 6 Characters and has at least one number";
        setValidation(newValidation);
      } else {
        const newValidation = { ...validation };
        newValidation.password = "";
        setValidation(newValidation);
      }
    }

    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };

  return (
    <div className="form-container mx-auto border border-dark px-4 py-4 my-4">
      <h3 className="mb-3 text-center">
        {newUser ? "Create an account" : "Login"}
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
          {validation.email && (
            <p className="text-danger mt-3 text-center">{validation.email}</p>
          )}
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Control
            onBlur={handleBlur}
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          {validation.password && (
            <p className="text-danger mt-3 text-center">
              {validation.password}
            </p>
          )}
        </Form.Group>

        {newUser && (
          <Form.Group controlId="formBasicPasswordConfirm">
            <Form.Control
              onBlur={handleBlur}
              type="password"
              name="confirmpassword"
              placeholder="Confirm Password"
              required
            />
          </Form.Group>
        )}

        <Button className="city-btn full-width-btn" type="submit">
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
        {newUser ? "Already have an account?" : "Don't have an account?"}
        <button
          className="text-decoration-underline border-0 signin-link"
          onClick={() => SetNewUser(!newUser)}
        >
          {newUser ? "Login" : "Create an account"}
        </button>
      </div>
       <div><p className="text-center mt-3 mb-0">Or</p></div>
      <div className="text-center my-2">
        <button onClick={googleSignIn} className="google-btn">
          <FontAwesomeIcon className="google-icon" icon={faGoogle} /> Continue
          With Google
        </button>
      </div>
    </div>
  );
};

export default Login;
