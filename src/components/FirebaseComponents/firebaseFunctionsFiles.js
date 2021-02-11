import { faBatteryEmpty } from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useState, useEffect } from "react";
import { storage, firestore } from "./firebase";
import { useAuth } from "./firebaseFunctionsAuth";

const FileContext = React.createContext();

export const useData = () => {
  return useContext(FileContext);
};

const storageRef = storage.ref();

const FirebaseFunctionsFiles = ({ children }) => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState();
  const [userPhoto, setUserPhoto] = useState();
  const [loading, setLoading] = useState(true);

  const createUserProfile = (userName) => {
    const currentTime = new Date();
    const { email } = currentUser;
    const profilePhoto = storage.ref(
      `${currentUser.uid}/profilePhoto/profilePic`
    ).fullPath;

    return firestore.collection("users").doc(`${currentUser.uid}`).set({
      email: email,
      createdAt: currentTime,
      profilePhoto: profilePhoto,
        UserName: userName,
      Hobby: 'Hobby',
      Age: 'Age',
      Country: 'Country',
      Job: 'Job',
    });
  };

  const updateUserProfile = (y) => {
      const { Age, Hobby, UserName, Job, Country } = y;
      
    return firestore.collection("users").doc(`${currentUser.uid}`).update({
        UserName: UserName,
        Hobby: Hobby,
        Age: Age,
        Country: Country,
        Job: Job,
      });
  }

  const createUserProfilePhoto = (profilePhoto) => {
    return storageRef
      .child(`${currentUser.uid}/profilePhoto/profilePic`)
      .put(profilePhoto);
  };

  const setUserProfile = async () => {
    if (currentUser) {
      try {
        const docRef = await firestore.collection("users").doc(currentUser.uid);
        docRef.get().then((doc) => {
          if (doc && doc.exists) {
            setUserData(doc.data());
            storageRef
              .child(doc.data().profilePhoto)
              .getDownloadURL()
              .then((url) => {
                setUserPhoto(url);
              });
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    setUserProfile();
  }, [currentUser]);

  const functions = {
    createUserProfilePhoto,
    createUserProfile,
    setUserProfile,
    updateUserProfile,
    userData,
    userPhoto,
  };
  return (
    <FileContext.Provider value={functions}>{children}</FileContext.Provider>
  );
};

export default FirebaseFunctionsFiles;
