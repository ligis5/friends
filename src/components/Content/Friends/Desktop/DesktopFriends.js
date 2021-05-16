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
    const filterToFriends = excludeOwner.filter((u) => {
      if (u.userId === p.id) {
        const y = Object.assign(u, p.data());
        return y;
      }
    });
    return filterToFriends;
  });

  return (
    <Container className="deskFriends">
      <h5 className="friends-title">My Friends</h5>
      {myFriends
        .flat()
        .map(
          (user) =>
            user && <Friend position={"right"} key={user.userId} user={user} />
        )}
    </Container>
  );
};

export default DesktopFriends;
