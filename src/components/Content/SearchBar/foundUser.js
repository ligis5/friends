import React from "react";
import UserPhoto from "../userPhoto";
import { useData } from "../../FirebaseComponents/firebaseFunctionsFiles";

import { Tooltip, OverlayTrigger } from "react-bootstrap";

const FoundUser = ({ user }) => {
  const { addFriend } = useData();

  const renderTooltip = (props) => {
    return (
      <Tooltip id="button-tooltip" {...props}>
        {user.status === "pending" &&
          `${user.UserName} sent friend request, click pending to accept`}
        {user.status === "sent" && `friend request was sent, click to undo`}
      </Tooltip>
    );
  };
  // Create cancel friend request. Added friend should appear in friends list.
  return (
    <div className="foundUser">
      <div className="foundUser">
        <UserPhoto size="30px" userPhoto={user.smallProfilePhoto} />
        <h5>{user.UserName}</h5>
      </div>
      <Tooltip id="button-tooltip">Simple tooltip</Tooltip>
      {user.status ? (
        <OverlayTrigger
          placement="right"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
          <button className="requestFriend">{user.status}</button>
        </OverlayTrigger>
      ) : (
        <button
          onClick={() => addFriend(user.userId)}
          className="requestFriend"
        >
          Send friend request
        </button>
      )}
    </div>
  );
};
export default FoundUser;
