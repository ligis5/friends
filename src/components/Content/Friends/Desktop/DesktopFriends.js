import React from "react";
import { Container } from "react-bootstrap";
import Friend from "../Friend";
import { useData } from "../../../FirebaseComponents/firebaseFunctionsFiles";
import "./DesktopFriends.css";

const DesktopFriends = () => {
  const { allUsers, userData, peopleFound } = useData();

  const excludeOwner =
    allUsers && userData
      ? allUsers.filter((u) => u.userId !== userData.userId)
      : null;

  const myFriends = peopleFound.map((p) => {
    const filterToFriends = excludeOwner.filter(
      (u) => u.userId === p.id && p.data().status === "friends"
    );
    return filterToFriends;
  });

  return (
    <Container className="deskFriends">
      <h4 className="friends-title">My Friends</h4>
      {myFriends.flat().map((user) => (
        <Friend key={user.userId} user={user} />
      ))}
    </Container>
  );
};

export default DesktopFriends;
