import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "./firebaseFunctionsAuth";
import firebase from "firebase/app";

const FileContext = React.createContext();

export const FireDatabase = () => {
  return useContext(FileContext);
};

const FirebaseDatabase = ({ children }) => {
  const [allUsersStatus, setAllUsersStatus] = useState();
  const { currentUser } = useAuth();
  const userOffline = () => {
    return firebase
      .database()
      .ref(`users/${currentUser.uid}`)
      .onDisconnect()
      .set({
        online: false,
      });
  };
  const logOff = () => {
    return firebase.database().ref(`users/${currentUser.uid}`).set({
      online: false,
    });
  };
  const userOnline = () => {
    return firebase.database().ref(`users/${currentUser.uid}`).set({
      online: true,
    });
  };
  const getData = async () => {
    const dataRef = await firebase.database().ref("users");
    dataRef.on("value", (snapshot) => {
      setAllUsersStatus(snapshot.val());
    });
    userOffline();
    userOnline();
  };
  useEffect(() => {
    if (currentUser) {
      getData();
    }
  }, [currentUser]);

  const functions = {
    allUsersStatus,
    logOff,
  };
  return (
    <FileContext.Provider value={functions}>{children}</FileContext.Provider>
  );
};
export default FirebaseDatabase;
