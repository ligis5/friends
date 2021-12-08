import React, { useContext, useEffect, useState } from "react";
import { auth } from "./firebase";
import firebase from "firebase/app";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const FirebaseFunctionsAuth = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [updated, setUpdated] = useState(false);
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
          // if psw got changed text appears for 5 seconds that tells about successful update.
          setUpdated(true);
          setTimeout(() => {
            setUpdated(false);
          }, 5000);
        })
        .catch((error) => {
          console.log(error);
        })
    );
  };
  const reuthenticateUser = (password) => {
    const credential = firebase.auth.EmailAuthProvider.credential(
      currentUser.email,
      password
    );
    return currentUser.reauthenticateWithCredential(credential);
  };
  const deleteUser = async () => {
    return currentUser
      .delete()
      .then(() => {
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setLoading(false);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser();
      }
    });
    return () => {
      unsubscribe();
      setLoading(true);
    };
  }, [currentUser]);
  const functions = {
    currentUser,
    updated,
    loading,
    register,
    login,
    forgotPassword,
    SignOut,
    changePassword,
    deleteUser,
    reuthenticateUser,
  };
  return (
    <AuthContext.Provider value={functions}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default FirebaseFunctionsAuth;
