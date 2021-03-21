import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

export const initializeLoginFramework = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
};

export const handleGoogleSignIn = () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((res) => {
      const { displayName, email } = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        success: true,
      };
      return signedInUser;
    })
    .catch((error) => {
      const signedInUser = {
        isSignedIn: false,
        name: "",
        email: "",
      };
      return signedInUser;
    });
};

export const createUserWithEmailAndPassword = (name, email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      updateUserName(name);
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
};

export const signInWithEmailandPassword = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.name = res.user.displayName;
      newUserInfo.error = "";
      newUserInfo.success = true;
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
};

const updateUserName = (name) => {
  const user = firebase.auth().currentUser;
  user
    .updateProfile({
      displayName: name,
    })
    .then(() => {
      console.log("User name Updated successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};
