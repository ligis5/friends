import React, { useState } from "react";
import { FireDatabase } from "../../FirebaseComponents/FirebaseDatabase";
import ChatRoom from "./ChatRoom";
import "./Friend.css";

const Friend = ({ user }) => {
  const { allUsersStatus } = FireDatabase();
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
      <ChatRoom
        user={user}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <h3 onClick={() => setModalShow(true)} className="userName">
        {user.UserName}
      </h3>
      <div
        className={isOnline ? "online" : "offline"}
        color={isOnline ? "rgb(3, 182, 3)" : "white"}
      />
    </div>
  );
};

export default Friend;
