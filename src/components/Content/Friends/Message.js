import React, { useState } from "react";
import { Toast } from "react-bootstrap";
import { useData } from "../../FirebaseComponents/firebaseFunctionsFiles";

const Message = ({ messages, user }) => {
  const { storageRef, userData } = useData();
  const [messagePhoto, setMessagePhoto] = useState();
  const { createdAt, message, userPhoto, sender } = messages;
  if (userPhoto) {
    storageRef
      .child(userPhoto)
      .getDownloadURL()
      .then((url) => {
        setMessagePhoto(url);
      });
  }

  return (
    <Toast
      style={
        userData.userId === sender
          ? { height: "max-content", width: "400px", marginLeft: "auto" }
          : { height: "max-content", width: "400px" }
      }
    >
      <Toast.Header>
        <img src={messagePhoto} className="messageImg" alt="" />
        <h5 className="messageOwner">
          {userData.userId === sender ? userData.UserName : user.UserName}
        </h5>
        <small className="messageTime">
          {createdAt.toDate().toLocaleTimeString("en-US")}
        </small>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
};

export default Message;
