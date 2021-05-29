import React from "react";
import { Toast } from "react-bootstrap";
import { useData } from "../../FirebaseComponents/firebaseFunctionsFiles";

import "./Message.css";
import UserPhoto from "../userPhoto";

const Message = ({ messages, user }) => {
  const { userData, allUsers } = useData();
  const { createdAt, message, sender } = messages;
  const getMessagePhoto = allUsers.filter((u) => u.userId === sender);

  return (
    <Toast
      style={
        userData.userId === sender
          ? { height: "max-content", width: "400px", marginLeft: "auto" }
          : { height: "max-content", width: "400px" }
      }
    >
      <Toast.Header>
        {getMessagePhoto ? (
          <UserPhoto
            size="30px"
            userPhoto={getMessagePhoto[0].smallProfilePhoto}
            user={getMessagePhoto[0].userId}
          />
        ) : (
          <div style={{ width: "30px", height: "30px" }}></div>
        )}

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
