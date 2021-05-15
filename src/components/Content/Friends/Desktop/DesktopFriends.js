import React from "react";
import { Container, Row } from "react-bootstrap";
import Friend from "../Friend";
import { useData } from "../../../FirebaseComponents/firebaseFunctionsFiles";
import "./DesktopFriends.css";

const DesktopFriends = () => {
  const { allUsers, userData, peopleFound } = useData();
  const excludeOwner =
    allUsers && userData
      ? allUsers.filter((u) => u.userId !== userData.userId)
      : null;

  // const myFriends = peopleFound.map((p) => {
  //   const filterToFriends = allUsers.filter(
  //     (u) => u.userId === Object.keys(p.data())[0]
  //   );
  //   return filterToFriends;
  // });
  // myFriends.forEach((u) => {
  //   console.log(u);
  // });

  return (
    <Container className="deskFriends">
      {excludeOwner.map((user) => (
        <Friend key={user.userId} user={user} />
      ))}
    </Container>
  );
};

export default DesktopFriends;
