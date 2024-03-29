import React, { useContext, useState, useEffect, useRef } from "react";
import { storage, firestore } from "./firebase";
import { useAuth } from "./firebaseFunctionsAuth";

const FileContext = React.createContext();

export const useData = () => {
  return useContext(FileContext);
};

export const storageRef = storage.ref();

const FirebaseFunctionsFiles = ({ children }) => {
  const { currentUser, deleteUser, loading } = useAuth();
  const [userData, setUserData] = useState();
  const [userPhoto, setUserPhoto] = useState();
  const [userPosts, setUserPosts] = useState();
  const [peopleFound, setPeopleFound] = useState();
  const newPost = useRef(true);
  const [allUsers, setAllUsers] = useState();
  const [comments, setComments] = useState();
  const [messages, setMessages] = useState();

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

  const createUserProfile = async (userName) => {
    const { email } = currentUser;
    const profilePhoto = storage.ref(
      `${currentUser.uid}/profilePhoto/profilePic`
    ).fullPath;
    const x = await firestore
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
    addFriend("Zb11i9vqeHN4IYI7ts7yafzzhRS2", "friends");

    return x;
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
    try {
      const docRef = await firestore.collection("users").doc(currentUser.uid);
      const unsubscribe = docRef.onSnapshot((doc) => {
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

      if (!currentUser) unsubscribe();
      return unsubscribe;
    } catch (error) {
      console.log(error);
    }
  };

  // Getting all existing users.
  const getUsers = async () => {
    const y = [];
    const unsubscribe = await firestore
      .collection("users")
      .onSnapshot((querySnapshot) => {
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

    if (!currentUser) unsubscribe();
    return unsubscribe;
  };
  // change so only friends posts would be fetched!!!!
  // Getting all posts.
  // change so only certain amount would be gotten at time.
  const retrievePosts = async () => {
    const unsubscribe = await firestore
      .collection("posts")
      .onSnapshot((querySnapshot) => {
        setUserPosts(querySnapshot.docs);
      });
    if (!currentUser) unsubscribe();
    return unsubscribe;
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
    const unsubscribe = await firestore
      .collection("comments")
      .orderBy("createdAt")
      .onSnapshot((querySnapshot) => {
        setComments(querySnapshot.docs.reverse());
      });
    if (!currentUser) unsubscribe();
    return unsubscribe;
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
    const unsubscribe = await firestore
      .collection("users")
      .doc(currentUser.uid)
      .collection("messages")
      .orderBy("createdAt")
      .onSnapshot((querySnapshot) => {
        setMessages(querySnapshot.docs);
      });
    if (!currentUser) unsubscribe();
    return unsubscribe;
  };

  const writeMessage = (message, recipient) => {
    const y = uuidv4();
    const saveMessages = () => {
      firestore
        .collection("users")
        .doc(currentUser.uid)
        .collection("messages")
        .doc(y)
        .set({
          message: message,
          createdAt: currentTime,
          recipient: recipient,
          sender: currentUser.uid,
        });
      firestore
        .collection("users")
        .doc(recipient)
        .collection("messages")
        .doc(y)
        .set({
          message: message,
          createdAt: currentTime,
          sender: currentUser.uid,
          recipient: recipient,
        });
    };

    return saveMessages();
  };
  // fetch all friends of logged in user.
  const findFriends = async () => {
    const unsubscribe = await firestore
      .collection("users")
      .doc(currentUser.uid)
      .collection("friends")
      .onSnapshot((snapshot) => {
        setPeopleFound(snapshot.docs);
      });
    if (!currentUser) unsubscribe();
    return unsubscribe;
  };

  // depending on the action of the user, different action is ran.
  const addFriend = (pendingFriend, doWhat) => {
    const setFriends = () => {
      switch (doWhat) {
        case "friends":
          firestore
            .collection("users")
            .doc(currentUser.uid)
            .collection("friends")
            .doc(pendingFriend)
            .set({
              status: "friends",
            });
          firestore
            .collection("users")
            .doc(pendingFriend)
            .collection("friends")
            .doc(currentUser.uid)
            .set({
              status: "friends",
            });
          break;
        case "cancel":
          firestore
            .collection("users")
            .doc(currentUser.uid)
            .collection("friends")
            .doc(pendingFriend)
            .set({
              status: "declined",
            });
          firestore
            .collection("users")
            .doc(pendingFriend)
            .collection("friends")
            .doc(currentUser.uid)
            .set({
              status: "declined",
            });
          break;
        case "declined":
          firestore
            .collection("users")
            .doc(currentUser.uid)
            .collection("friends")
            .doc(pendingFriend)
            .delete();

          firestore
            .collection("users")
            .doc(pendingFriend)
            .collection("friends")
            .doc(currentUser.uid)
            .delete();
          break;
        case "Add Friend":
          firestore
            .collection("users")
            .doc(pendingFriend)
            .collection("friends")
            .doc(currentUser.uid)
            .set({ status: "confirm" });

          firestore
            .collection("users")
            .doc(currentUser.uid)
            .collection("friends")
            .doc(pendingFriend)
            .set({ status: "cancel" });
          break;
        default:
          return;
      }
    };

    return setFriends();
  };

  const deleteFriend = (friend) => {
    let doThis = () => {
      firestore
        .collection("users")
        .doc(currentUser.uid)
        .collection("friends")
        .doc(friend)
        .delete();

      firestore
        .collection("users")
        .doc(friend)
        .collection("friends")
        .doc(currentUser.uid)
        .delete();
    };
    return doThis();
  };

  const deleteComment = async (commentId) => {
    await firestore.collection("comments").doc(commentId).delete();
  };

  const deleteMessage = (messageId, friendId) => {
    let doThis = () => {
      firestore
        .collection("users")
        .doc(currentUser.uid)
        .collection("messages")
        .doc(messageId)
        .delete();

      firestore
        .collection("users")
        .doc(friendId)
        .collection("messages")
        .doc(messageId)
        .delete();
    };
    return doThis();
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

  const deleteAllMessagesAndFriends = () => {
    firestore
      .collection("users")
      .doc(currentUser.uid)
      .collection("friends")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((friendDoc) => {
          deleteFriend(friendDoc.id);
          //every message where user is sender
          firestore
            .collection("users")
            .doc(friendDoc.id)
            .collection("messages")
            .where("sender", "==", currentUser.uid)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                deleteMessage(doc.id, friendDoc.id);
              });
            })
            .catch((error) => {
              console.log(error);
            });
          // every message where user is recipient
          firestore
            .collection("users")
            .doc(friendDoc.id)
            .collection("messages")
            .where("recipient", "==", currentUser.uid)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                deleteMessage(doc.id, friendDoc.id);
              });
            })
            .catch((error) => {
              console.log(error);
            });
        });
      });
  };
  // hapens when user does byeBye :(
  const deleteUserData = () => {
    deleteAllMessagesAndFriends();
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
        storageRef.child(`${currentUser.uid}/commentPhoto/commentPic`).delete();
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
      findFriends();
    }
    return() => {
      setUserData()
      setUserPhoto()
      setUserPosts()
      setPeopleFound()
      setAllUsers()
      setComments()
      setMessages()
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
    getMessages,
    addFriend,
    deleteFriend,
    deleteMessage,
    // functions
    // data
    userData,
    userPhoto,
    userPosts,
    storageRef,
    allUsers,
    comments,
    messages,
    peopleFound,
    // data
  };
  return (
    <FileContext.Provider value={functions}>
      {!loading && children}
    </FileContext.Provider>
  );
};

export default FirebaseFunctionsFiles;
