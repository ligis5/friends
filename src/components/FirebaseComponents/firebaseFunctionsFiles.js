
import React, { useContext, useState, useEffect } from "react";
import { storage, firestore } from "./firebase";
import { useAuth } from "./firebaseFunctionsAuth";


const FileContext = React.createContext();

export const useData = () => {
  return useContext(FileContext);
};

export const storageRef = storage.ref();

const FirebaseFunctionsFiles = ({ children }) => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState();
  const [userPhoto, setUserPhoto] = useState();
  const [userPosts, setUserPosts] = useState();
  const [newPost, setNewPost] = useState(true);
  const [allUsers, setAllUsers] = useState();

  
  

  const currentTime = new Date();

  const createUserProfile = (userName) => {
    const { email } = currentUser;
    const profilePhoto = storage.ref(
      `${currentUser.uid}/profilePhoto/profilePic`
    ).fullPath;

    return firestore.collection("users").doc(`${currentUser.uid}`).set({
      email: email,
      createdAt: currentTime,
      profilePhoto: profilePhoto,
      UserName: userName,
      Name:'Name',
      Hobby: "Hobby",
      Age: "Age",
      Country: "Country",
      Job: "Job",
    });
  };

  const updateUserProfile = (y) => {
    const { Age, Hobby, UserName, Job, Country, Name } = y;

    return firestore.collection("users").doc(`${currentUser.uid}`).update({
      UserName: UserName,
      Hobby: Hobby,
      Name: Name,
      Age: Age,
      Country: Country,
      Job: Job,
    });
  };

  const createUserProfilePhoto = (profilePhoto, newProfilePhoto) => {
    if (newProfilePhoto) {
      // if user puts new profile photo, newProfilePhoto is used until rerender.
      setUserPhoto(newProfilePhoto);
    }
    // not converted profilePhoto file is sent to storage and will be used as profilePhoto after render.
    return storageRef
      .child(`${currentUser.uid}/profilePhoto/profilePic`)
      .put(profilePhoto);
  };

  const setUserProfile = async () => {
    if (currentUser) {
      try {
        const docRef = await firestore.collection("users").doc(currentUser.uid);
        docRef.onSnapshot((doc) => {
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

  const getUsers = async () => {
 await firestore.collection("users").get().then((querySnapshot) => {
  setAllUsers(querySnapshot.docs)
});
  }


  const retrievePosts = async () => {
   await firestore.collection("posts").get().then((querySnapshot) => {
        setUserPosts(querySnapshot.docs)
        setNewPost(false)
  });
  }

  // used to create text post.
  const createPostT = (postText) => {
    if(postText){
      setNewPost(true)
      return firestore.collection("posts").doc().set({
          aboutPost: postText,
        createdAt: currentTime,
        userId: currentUser.uid
      });
    }
  }
  // used to create photo post, using chosen photo from users device.
  const createPostP = (postText, photoFile) => {
    const x = storage.ref(
      `${currentUser.uid}/PostPhotos/${photoFile.name}`
    ).fullPath
      setNewPost(true)

      return firestore.collection("posts").doc().set({
          aboutPost: postText,
          postPhoto: x,
          createdAt: currentTime,
          userId: currentUser.uid
      });
  }
// used to create video post, using youtube url.
  const createPostV = (postText, sendUrl) => {
    if(sendUrl){
      setNewPost(true)
      return firestore.collection("posts").doc().set({
          aboutPost: postText,
          video: sendUrl,
        createdAt: currentTime,
        userId: currentUser.uid
      });
    }
  }
// used for putting users post photos in storage and once that is done,
//  it runs function that creates new user photo post.
  const uploadPostPhoto = ( postText, photoFile) => {
    return  storageRef
      .child(`${currentUser.uid}/PostPhotos/${photoFile.name}`)
      .put(photoFile)
      .on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          if(progress === 100){
            createPostP( postText, photoFile)
          }
        },
        (error) => {
          console.log(error, "error at uploading post photo")
        }
      );
  };
  useEffect(() => {
    if(newPost){
      retrievePosts()
    }
  }, [newPost]);

  useEffect(() => {
    getUsers();
  },[])

  useEffect(() => {
    setUserProfile();
  }, [currentUser]);

  const functions = {
    createUserProfilePhoto,
    createUserProfile,
    setUserProfile,
    updateUserProfile,
    createPostP,
    uploadPostPhoto,
    createPostT,
    createPostV,
    userData,
    userPhoto,
    userPosts,
    storageRef,
    allUsers
  };
  return (
    <FileContext.Provider value={functions}>{children}</FileContext.Provider>
  );
};

export default FirebaseFunctionsFiles;
