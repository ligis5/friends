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

  // random id generator for naming post photos.
  const uuidv4 = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  };

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
      Name: "Name",
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
  // For adding and updating user profile photo.
  const createUserProfilePhoto = (profilePhoto, newProfilePhoto) => {
    if (newProfilePhoto) {
      // if user puts new profile photo, newProfilePhoto is used until rerender.
      setUserPhoto(newProfilePhoto);
    }

    // not converted profilePhoto file is sent to storage and will be used as profilePhoto after render.
    // And getUsers are run to update everything with new profile photo.
    return storageRef
      .child(`${currentUser.uid}/profilePhoto/profilePic`)
      .put(profilePhoto)
      .on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          if (progress === 100) {
            getUsers();
          }
        },
        (error) => {
          console.log(error, "error at uploading user photo");
        }
      );
  };
  // Getting data of currently logged in user.
  const setUserProfile = async () => {
    if (currentUser) {
      try {
        const docRef = await firestore.collection("users").doc(currentUser.uid);
        docRef.onSnapshot((doc) => {
          if (doc && doc.exists) {
            const x = Object.assign(doc.data(), { userId: doc.id });
            setUserData(x);
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

  // Getting all existing users.
  const getUsers = async () => {
    let y = [];
    return await firestore
      .collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const x = Object.assign(doc.data(), { userId: doc.id });
          y.push(x);
        });
        setAllUsers(y);
      });
  };

  // Getting all posts.
  const retrievePosts = async () => {
    await firestore.collection("posts").onSnapshot((querySnapshot) => {
      setUserPosts(querySnapshot.docs);
      setNewPost(false);
    });
  };

  // used to create text post.
  const createPostT = (postText) => {
    if (postText) {
      setNewPost(true);
      return firestore.collection("posts").doc().set({
        aboutPost: postText,
        likes: 0,
        createdAt: currentTime,
        userId: currentUser.uid,
      });
    }
  };
  // used to create photo post, using chosen photo from users device.
  const createPostP = (postText, photoFile, y) => {
    const x = storage.ref(`${currentUser.uid}/PostPhotos/${y}${photoFile.name}`)
      .fullPath;
    setNewPost(true);
    return firestore.collection("posts").doc().set({
      aboutPost: postText,
      randomKey: y,
      postPhoto: x,
      likes: 0,
      createdAt: currentTime,
      userId: currentUser.uid,
    });
  };
  // used to create video post, using youtube or soundcloud url.
  const createPostV = (postText, sendUrl) => {
    if (sendUrl) {
      setNewPost(true);
      return firestore.collection("posts").doc().set({
        aboutPost: postText,
        video: sendUrl,
        likes: 0,
        createdAt: currentTime,
        userId: currentUser.uid,
      });
    }
  };
  // used for putting users post photos in storage and once that is done,
  //  it runs function that creates new user photo post.
  const uploadPostPhoto = (postText, photoFile) => {
    const y = uuidv4();
    return storageRef
      .child(`${currentUser.uid}/PostPhotos/${y}${photoFile.name}`)
      .put(photoFile)
      .on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          if (progress === 100) {
            createPostP(postText, photoFile, y);
            setNewPost(true);
          }
        },
        (error) => {
          console.log(error, "error at uploading post photo");
        }
      );
  };

  const getLikeDislike = (like, postId) => {
    return firestore.collection("posts").doc(postId).update({
      likes: like,
    });
  };
  // delete post and run retrievePosts to update what user sees.
  const deletePost = async (postId, postPhoto) => {
    await firestore.collection("posts").doc(postId).delete();
    if (postPhoto) {
      storageRef.child(postPhoto).delete();
    }
  };

  // Every time new post is created use Effect updates posts, that are shown.
  useEffect(() => {
    if (newPost) {
      retrievePosts();
    }
    return () => {
      setNewPost(false);
    };
  }, [newPost]);

  // onMount get all users data.
  useEffect(() => {
    getUsers();
  }, []);

  // Every time user updates his data this is run.
  useEffect(() => {
    setUserProfile();
  }, [currentUser]);

  // functions and data for exporting.
  const functions = {
    // functions
    createUserProfilePhoto,
    createUserProfile,
    setUserProfile,
    updateUserProfile,
    uploadPostPhoto,
    createPostT,
    createPostV,
    getLikeDislike,
    deletePost,
    getUsers,
    // functions
    // data
    userData,
    userPhoto,
    userPosts,
    storageRef,
    allUsers,
    // data
  };
  return (
    <FileContext.Provider value={functions}>{children}</FileContext.Provider>
  );
};

export default FirebaseFunctionsFiles;
