import React from "react";
import { Container, Popover, OverlayTrigger, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Friend from "../Friend";
import AllFriendsAssign from "../../../../AllFriendsAssign";

import "./FriendsDropLeft.css";

const FriendsDropLeft = () => {
  const myFriends = AllFriendsAssign();

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
              {myFriends &&
                myFriends.map((user) => (
                  <Friend position={"left"} key={user.userId} user={user} />
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
