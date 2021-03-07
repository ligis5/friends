import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-bootstrap";
import { useData } from "../../FirebaseComponents/firebaseFunctionsFiles";

const LikeDislike = ({ likes, postId }) => {
  const { getLikeDislike } = useData();
  const [color, setColor] = useState("white");
  const [color1, setColor1] = useState("white");

  const likeButton = () => {
    if (color === "white" && color1 === "white") {
      getLikeDislike(likes + 1, postId);
      setColor("green");
    } else if (color === "white" && color1 === "red") {
      getLikeDislike(likes + 1, postId);
      setColor1("white");
      setColor("white");
    } else {
      return;
    }
  };
  const dislikeButton = () => {
    if (color1 === "white" && color === "white") {
      getLikeDislike(likes - 1, postId);
      setColor1("red");
    } else if (color1 === "white" && color === "green") {
      getLikeDislike(likes - 1, postId);
      setColor1("white");
      setColor("white");
    }
  };

  return (
    <Card.Text as="div" style={{ display: "flex", gap: "10px" }}>
      <FontAwesomeIcon
        style={{ cursor: "pointer" }}
        icon={faThumbsUp}
        color={color}
        onClick={likeButton}
      />
      <h6>Likes: {likes}</h6>
      <FontAwesomeIcon
        style={{ cursor: "pointer" }}
        icon={faThumbsDown}
        color={color1}
        onClick={dislikeButton}
      />
    </Card.Text>
  );
};
export default LikeDislike;
