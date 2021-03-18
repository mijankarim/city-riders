import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { Form, Button } from "react-bootstrap";

const Login = () => {
  const [newUser, SetNewUser] = useState(true);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
    success: false,
    error: "",
  });

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();

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
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
          console.log(error.message);
        });
    }

    if (!newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
          console.log(error.message);
        });
    }
    e.preventDefault();
  };

  const handleGoogleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        var user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFbSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        const user = result.user;
        console.log(user.displayName);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateUserName = (name) => {
    var user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: name,
      })
      .then(() => {
        console.log("User name updated successfully");
      })
      .catch((error) => {
        console.log(error);
      });
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
        <button onClick={handleGoogleSignIn}>Login Using Google</button>
      </div>

      <div className="text-center my-3">
        <button onClick={handleFbSignIn}>Login Using FaceBook</button>
      </div>
    </div>
  );
};

export default Login;