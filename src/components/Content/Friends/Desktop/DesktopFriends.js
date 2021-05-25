import React from "react";
import { Container } from "react-bootstrap";
import Friend from "../Friend";
import AllFriendsAssign from "../../../../AllFriendsAssign";
import "./DesktopFriends.css";

const DesktopFriends = () => {
  const myFriends = AllFriendsAssign();

  return (
    <Container className="deskFriends">
      <h5 className="friends-title">My Friends</h5>
      {myFriends &&
        myFriends.map(
          (user) =>
            user && <Friend position={"right"} key={user.userId} user={user} />
        )}
    </Container>
  );
};

export default DesktopFriends;
