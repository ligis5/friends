import React from "react";
import {
  Container,
  Row,
  Col,
  Popover,
  OverlayTrigger,
  Button,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Friend from "../Friend";
import { useData } from "../../../FirebaseComponents/firebaseFunctionsFiles";

import "./FriendsDropLeft.css";

const FriendsDropLeft = () => {
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
    <Container bsPrefix="dropLeft">
      <OverlayTrigger
        trigger="click"
        key="left"
        placement="left"
        overlay={
          <Popover bsPrefix>
            <Popover.Title
              style={{
                fontSize: "180%",
                fontWeight: "700",
                color: "rgb(79, 59, 120)",
              }}
              as="h1"
            >
              Friends
            </Popover.Title>
            <Popover.Content className="friends">
              {myFriends.flat().map((user) => (
                <Friend key={user.userId} user={user} />
              ))}
            </Popover.Content>
          </Popover>
        }
      >
        <Button
          style={{ backgroundColor: "aliceblue" }}
          className="friendsButton"
          variant="secondary"
        >
          <FontAwesomeIcon className="dropLeftIcon" icon={faChevronLeft} />
        </Button>
      </OverlayTrigger>
    </Container>
  );
};

export default FriendsDropLeft;
