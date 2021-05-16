import React, { useState } from "react";
import { FireDatabase } from "../../FirebaseComponents/FirebaseDatabase";
import { useData } from "../../FirebaseComponents/firebaseFunctionsFiles";
import ChatRoom from "./ChatRoom";
import { faCheck, faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import "./Friend.css";

const Friend = ({ user, position }) => {
  const { addFriend } = useData();
  const { allUsersStatus } = FireDatabase() || {};
  const [modalShow, setModalShow] = useState(false);

  let isOnline;
  if (allUsersStatus) {
    Object.entries(allUsersStatus).filter((x) => {
      if (x[0] === user.userId) {
        isOnline = x[1].online;
      }
    });
  }

  return (
    <div className="friend">
      {user.status === "friends" && (
        <>
          <ChatRoom
            user={user}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
          <h6 onClick={() => setModalShow(true)} className="userName">
            {user.UserName}
          </h6>
          <div
            className={isOnline ? "online" : "offline"}
            color={isOnline ? "rgb(3, 182, 3)" : "white"}
          />
        </>
      )}
      {user.status === "confirm" && (
        <>
          <OverlayTrigger
            placement={position}
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip className="my-tooltip" id={"tooltip-right"}>
                {`${user.UserName} sent you friend request`}
              </Tooltip>
            }
          >
            <h6 className="userName">{user.UserName}</h6>
          </OverlayTrigger>

          <div style={{ backgroundColor: "rgba(255, 255, 255, 0)" }}>
            <OverlayTrigger
              placement={position}
              delay={{ show: 250, hide: 400 }}
              overlay={
                <Tooltip className="my-tooltip" id={"tooltip-right"}>
                  {`${user.UserName} sent you friend request, click to cancel`}
                </Tooltip>
              }
            >
              <FontAwesomeIcon
                className={
                  position === "left" ? "accept-deny-left" : "accept-deny"
                }
                icon={faBan}
                color="aliceblue"
                onClick={() => addFriend(user.userId, "cancel")}
              />
            </OverlayTrigger>
            <OverlayTrigger
              placement={position}
              delay={{ show: 250, hide: 200 }}
              overlay={
                <Tooltip className="my-tooltip" id={"tooltip-right"}>
                  {`${user.UserName} sent you friend request, click to accept`}
                </Tooltip>
              }
            >
              <FontAwesomeIcon
                className={
                  position === "left" ? "accept-deny-left" : "accept-deny"
                }
                icon={faCheck}
                color="aliceblue"
                onClick={() => addFriend(user.userId, "friends")}
              />
            </OverlayTrigger>
          </div>
        </>
      )}
    </div>
  );
};

export default Friend;
