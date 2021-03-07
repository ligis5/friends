import React, { useContext, useState, useEffect, useRef } from "react";
import { storage, firestore } from "./firebase";
import { useAuth } from "./firebaseFunctionsAuth";

const FileContext = React.createContext();

export const useData = () => {
  return useContext(FileContext);
};

export const storageRef = storage.ref();

const FirebaseFunctionsFiles = ({ children }) => {
  const { currentUser, deleteUser } = useAuth();
  const [userData, setUserData] = useState();
  const [userPhoto, setUserPhoto] = useState();
  const [userPosts, setUserPosts] = useState();
  const newPost = useRef(true);
  const [allUsers, setAllUsers] = useState();
  const isMounted = useRef(false);

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
            setTimeout(() => {
              storageRef
                .child(`${currentUser.uid}/profilePhoto/profilePic`)
                .getDownloadURL()
                .then((url) => {
                  setUserPhoto(url);
                });
            }, 500);
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
    if (newPost) {
      await firestore.collection("posts").onSnapshot((querySnapshot) => {
        setUserPosts(querySnapshot.docs);
      });
    }
  };

  // used to create text post.
  const createPostT = (postText) => {
    if (postText) {
      newPost.current = true;
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
    if (photoFile) {
      const x = storage.ref(
        `${currentUser.uid}/PostPhotos/${y}${photoFile.name}`
      ).fullPath;
      newPost.current = true;
      return firestore.collection("posts").doc().set({
        aboutPost: postText,
        randomKey: y,
        postPhoto: x,
        likes: 0,
        createdAt: currentTime,
        userId: currentUser.uid,
      });
    }
  };
  // used to create video post, using youtube or soundcloud url.
  const createPostV = (postText, sendUrl) => {
    if (sendUrl) {
      newPost.current = true;
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
            setTimeout(() => {
              createPostP(postText, photoFile, y);
              newPost.current = true;
            }, 500);
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
  // hapens when user does byeBye :(
  const deleteUserData = () => {
    firestore
      .collection("posts")
      .where("userId", "==", currentUser.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          deletePost(doc.id, doc.data().postPhoto);
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        storageRef.child(`${currentUser.uid}/profilePhoto/profilePic`).delete();
      })
      .catch((error) => console.log(error))
      .then(() => {
        firestore.collection("users").doc(currentUser.uid).delete();
        setTimeout(() => {
          deleteUser();
        }, 1000);
      })
      .catch((error) => console.log(error));
    setUserData();
    setUserPhoto();
  };

  // Every time new post is created use Effect updates posts, that are shown.
  useEffect(() => {
    if (newPost) {
      retrievePosts();
    }
    return () => (newPost.current = false);
  }, [newPost, currentUser]);
  // get all users data.
  useEffect(() => {
    getUsers();
  }, [currentUser]);
  // Every time user updates his data, this is ran.
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
    deleteUserData,
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
