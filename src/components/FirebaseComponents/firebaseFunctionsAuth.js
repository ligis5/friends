import React, { useContext, useEffect, useState } from "react";
import { auth } from "./firebase";
import firebase from "firebase/app";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const FirebaseFunctionsAuth = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const register = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const forgotPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  const SignOut = () => {
    setLoading(true);
    auth.signOut();
  };

  const changePassword = async (oldPassword, newPassword) => {
    const credential = firebase.auth.EmailAuthProvider.credential(
      currentUser.email,
      oldPassword
    );
    return await currentUser.reauthenticateWithCredential(credential).then(() =>
      currentUser
        .updatePassword(newPassword)
        .then(() => {
          console.log("sucess");
        })
        .catch((error) => {
          console.log(error);
        })
    );
  };

  const deleteUser = async (password) => {
    var credential = firebase.auth.EmailAuthProvider.credential(
      currentUser.email,
      password
    );
    return await currentUser.reauthenticateWithCredential(credential).then(() =>
      currentUser
        .delete()
        .then(() => {})
        .catch((error) => {
          console.log(error);
        })
    );
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe, setLoading(true);
  }, []);
  const functions = {
    currentUser,
    register,
    login,
    forgotPassword,
    SignOut,
    changePassword,
    deleteUser,
  };
  return (
    <AuthContext.Provider value={functions}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default FirebaseFunctionsAuth;
