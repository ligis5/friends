import React, { useContext, useState, useEffect, useRef } from "react";
import { storage, firestore } from "./firebase";
import { useAuth } from "./firebaseFunctionsAuth";
import firebase from "firebase/app";

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
  const [peopleFound, setPeopleFound] = useState();
  const newPost = useRef(true);
  const [allUsers, setAllUsers] = useState();
  const [comments, setComments] = useState();
  const [recipientMessages, setRecipientMessages] = useState();
  const [senderMessages, setSenderMessages] = useState();

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

    return firestore
      .collection("users")
      .doc(`${currentUser.uid}`)
      .set({
        email: email,
        createdAt: currentTime,
        profilePhoto: profilePhoto,
        smallProfilePhoto: `${currentUser.uid}/commentPhoto/commentPic`,
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
  const createUserProfilePhoto = (
    profilePhoto,
    newProfilePhoto,
    commentPhoto
  ) => {
    if (newProfilePhoto) {
      // if user puts new profile photo, newProfilePhoto is used until rerender.
      setUserPhoto(newProfilePhoto);
    }
    storageRef
      .child(`${currentUser.uid}/commentPhoto/commentPic`)
      .put(commentPhoto);
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
  const UserProfile = async () => {
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
    const y = [];
    return await firestore.collection("users").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const x = Object.assign(doc.data(), { userId: doc.id });
        y.push(x);
      });
      const filterY = y.filter(
        (v, i, a) =>
          a.findIndex(
            (t) => JSON.stringify(t.userId) === JSON.stringify(v.userId)
          ) === i
      );
      setAllUsers(filterY);
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

  const getLikeDislike = (like, postId, collection) => {
    return firestore.collection(collection).doc(postId).update({
      likes: like,
    });
  };
  // Getting all Comments.
  const retrieveComments = async () => {
    await firestore
      .collection("comments")
      .orderBy("createdAt")
      .onSnapshot((querySnapshot) => {
        setComments(querySnapshot.docs.reverse());
      });
  };

  const createComment = (commentText, postId) => {
    return firestore.collection("comments").doc().set({
      UserName: userData.UserName,
      comment: commentText,
      likes: 0,
      createdAt: currentTime,
      userId: currentUser.uid,
      postId: postId,
    });
  };

  const getMessages = async () => {
    await firestore
      .collection("messages")
      .where("recipient", "==", currentUser.uid)
      .orderBy("createdAt")
      .onSnapshot((querySnapshot) => {
        setRecipientMessages(querySnapshot.docs);
      });
    await firestore
      .collection("messages")
      .where("sender", "==", currentUser.uid)
      .orderBy("createdAt")
      .onSnapshot((querySnapshot) => {
        setSenderMessages(querySnapshot.docs);
      });
  };

  const writeMessage = (message, recipient) => {
    return firestore.collection("messages").doc().set({
      message: message,
      createdAt: currentTime,
      sender: currentUser.uid,
      recipient: recipient,
    });
  };

  const findFriends = async () => {
    await firestore
      .collection("friends")
      .where(
        firebase.firestore.FieldPath.documentId(),
        "==",
        `${currentUser.uid}`
      )
      .onSnapshot((snapshot) => {
        setPeopleFound(snapshot.docs);
      });
  };

  const addFriend = (pendingFriend, doWhat) => {
    const setFriends = () => {
      switch (doWhat) {
        case "friends":
          firestore
            .collection("friends")
            .doc(pendingFriend)
            .set(
              {
                [currentUser.uid]: "friends",
              },
              { merge: true }
            );
          firestore
            .collection("friends")
            .doc(currentUser.uid)
            .set(
              {
                [pendingFriend]: "friends",
              },
              { merge: true }
            );
          break;
        case "cancel":
          firestore
            .collection("friends")
            .doc(pendingFriend)
            .set(
              {
                [currentUser.uid]: "declined",
              },
              { merge: true }
            );
          firestore
            .collection("friends")
            .doc(currentUser.uid)
            .set(
              {
                [pendingFriend]: "declined",
              },
              { merge: true }
            );
          break;
        case "declined":
          firestore
            .collection("friends")
            .doc(pendingFriend)
            .update({
              [currentUser.uid]: firebase.firestore.FieldValue.delete(),
            });
          firestore
            .collection("friends")
            .doc(currentUser.uid)
            .update({
              [pendingFriend]: firebase.firestore.FieldValue.delete(),
            });
          break;
        case "Add Friend":
          firestore
            .collection("friends")
            .doc(pendingFriend)
            .set({ [currentUser.uid]: "confirm" }, { merge: true });
          firestore
            .collection("friends")
            .doc(currentUser.uid)
            .set({ [pendingFriend]: "cancel" }, { merge: true });

        default:
          return;
      }
    };

    return setFriends();
  };

  const deleteComment = async (commentId) => {
    await firestore.collection("comments").doc(commentId).delete();
  };
  // delete post and run retrievePosts to update what user sees.
  // every comment that has postId of post that is being deleted will get deleted as well.
  const deletePost = async (postId, postPhoto) => {
    await firestore.collection("posts").doc(postId).delete();
    firestore
      .collection("comments")
      .where("postId", "==", postId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          deleteComment(doc.id);
        });
      })
      .catch((error) => {
        console.log(error);
      });
    if (postPhoto) {
      storageRef.child(postPhoto).delete();
    }
  };
  // hapens when user does byeBye :(
  const deleteUserData = () => {
    firestore
      .collection("comments")
      .where("userId", "==", currentUser.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          deleteComment(doc.id);
        });
      })
      .catch((error) => {
        console.log(error);
      });
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
    if (currentUser) {
      if (newPost) {
        retrievePosts();
      }
    }
    return () => (newPost.current = false);
  }, [newPost, currentUser]);
  // get all users data.
  useEffect(() => {
    if (currentUser) {
      getUsers();
      UserProfile();
      retrieveComments();
      getMessages();
      findFriends();
    }
  }, [currentUser]);

  // functions and data for exporting.
  const functions = {
    // functions
    createUserProfilePhoto,
    createUserProfile,
    UserProfile,
    updateUserProfile,
    uploadPostPhoto,
    createPostT,
    createPostV,
    getLikeDislike,
    deletePost,
    getUsers,
    deleteUserData,
    createComment,
    deleteComment,
    writeMessage,
    addFriend,
    // functions
    // data
    userData,
    userPhoto,
    userPosts,
    storageRef,
    allUsers,
    comments,
    senderMessages,
    recipientMessages,
    peopleFound,
    // data
  };
  return (
    <FileContext.Provider value={functions}>{children}</FileContext.Provider>
  );
};

export default FirebaseFunctionsFiles;
