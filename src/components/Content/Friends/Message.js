import React, { useState, useEffect, useRef } from "react";
import { Toast, Image } from "react-bootstrap";
import { useData } from "../../FirebaseComponents/firebaseFunctionsFiles";
import { useHistory } from "react-router-dom";
import useObserver from "../../../Observer";
import "./Message.css";

const Message = ({ messages, user }) => {
  const { storageRef, userData } = useData();
  const [messagePhoto, setMessagePhoto] = useState();
  const [load, setLoad] = useState(false);
  const ref = useRef();
  const onScreen = useObserver(ref);
  const history = useHistory();
  const { createdAt, message, userPhoto, sender } = messages;
  useEffect(() => {
    if (userPhoto) {
      storageRef
        .child(userPhoto)
        .getDownloadURL()
        .then((url) => {
          setMessagePhoto(url);
        });
    }
  }, [user]);
  useEffect(() => {
    if (onScreen) {
      setTimeout(() => {
        setLoad(true);
      }, 200);
    }
    return () => setLoad(false);
  }, [onScreen]);
  console.log(onScreen);
  return (
    <Toast
      ref={ref}
      style={
        userData.userId === sender
          ? { height: "max-content", width: "400px", marginLeft: "auto" }
          : { height: "max-content", width: "400px" }
      }
    >
      {load ? (
        <>
          <Toast.Header>
            {messagePhoto ? (
              <Image
                onClick={() => history.push(`/profile/${user.userId}`)}
                src={messagePhoto}
                roundedCircle
                style={{
                  cursor: "pointer",
                  backgroundColor: "rgb(79,59,120)",
                  width: "30px",
                  height: "30px",
                  objectFit: "cover",
                  border: "1px solid black",
                  boxShadow: "1px 1px black",
                }}
              />
            ) : (
              <></>
            )}

            <h5 className="messageOwner">
              {userData.userId === sender ? userData.UserName : user.UserName}
            </h5>
            <small className="messageTime">
              {createdAt.toDate().toLocaleTimeString("en-US")}
            </small>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </>
      ) : (
        <></>
      )}
    </Toast>
  );
};

export default Message;
