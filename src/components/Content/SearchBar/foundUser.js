import React from "react";
import UserPhoto from "../userPhoto";

const FoundUser = ({ user }) => {
  return (
    <div className="foundUser">
      <div className="foundUser">
        <UserPhoto size="30px" userPhoto={user.smallProfilePhoto} />
        <h5>{user.UserName}</h5>
      </div>
      <button className="requestFriend">Send friend request</button>
    </div>
  );
};
export default FoundUser;
