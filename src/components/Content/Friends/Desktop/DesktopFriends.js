import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Friend from "../Friend";
import { useData } from "../../../FirebaseComponents/firebaseFunctionsFiles";
import "./DesktopFriends.css";

const DesktopFriends = () => {
  const { allUsers, userData, peopleFound } = useData();
  const [friend, setFriend] = useState();

  const excludeOwner =
    allUsers && userData
      ? allUsers.filter((u) => u.userId !== userData.userId)
      : null;

  const myFriends = peopleFound.map((p) => {
    const filterToFriends = allUsers.filter(
      (u) => u.userId === p.id && p.data().status === "friends"
    );
    return filterToFriends;
  });
  // useEffect(() => {
  //   peopleFound.forEach((p) => {
  //     excludeOwner.forEach((u) => {
  //       if (u.userId === Object.keys(p.data())[0]) {
  //         setFriend(u);
  //       }
  //     });
  //   });
  // }, [peopleFound]);

  return (
    <Container className="deskFriends">
      {myFriends.flat().map((user) => (
        <Friend key={user.userId} user={user} />
      ))}
    </Container>
  );
};

export default DesktopFriends;
