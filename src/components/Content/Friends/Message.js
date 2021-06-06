import React, { useState } from "react";
import { Toast, Popover, Row, Button, OverlayTrigger } from "react-bootstrap";
import { useData } from "../../FirebaseComponents/firebaseFunctionsFiles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import "./Message.css";
import UserPhoto from "../userPhoto";

const Message = ({ messages, user, friendId }) => {
  const { userData, allUsers, deleteMessage } = useData();
  const [hidePopup, setHidePopup] = useState();
  const { createdAt, message, sender, messageId } = messages;
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
      <Toast.Body>
        {message}
        {userData.userId === sender && (
          <OverlayTrigger
            show={hidePopup}
            trigger="click"
            key="left"
            placement="left"
            overlay={
              <Popover id={"popover-positioned-left"}>
                <Popover.Title
                  style={{ fontSize: "large", color: "rgb(79, 59, 120)" }}
                  as="h3"
                >
                  Delete this message?
                </Popover.Title>
                <Popover.Content>
                  <Row
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <Button
                      bsPrefix="chooseButton"
                      onClick={() => setHidePopup(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      bsPrefix="chooseButton"
                      onClick={() => deleteMessage(messageId, friendId)}
                    >
                      Confirm
                    </Button>
                  </Row>
                </Popover.Content>
              </Popover>
            }
          >
            <button className="deleteMessage">
              <FontAwesomeIcon
                className="deleteMessage"
                onClick={() => setHidePopup(true)}
                icon={faTrash}
              />
            </button>
          </OverlayTrigger>
        )}
      </Toast.Body>
    </Toast>
  );
};

export default Message;
