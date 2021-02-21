import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-bootstrap";
import { useData } from '../FirebaseComponents/firebaseFunctionsFiles';

const LikeDislike = ({ likes, postId }) => {
  const { getLikeDislike } = useData();
  const [like, setLike] = useState(likes);
  const [color, setColor] = useState("white");
  const [color1, setColor1] = useState("white");

  const likeButton = () => {
    if (like === likes) {
      setLike(like + 1);
      getLikeDislike(like + 1, postId)
      setColor("green");
      setColor1("white");
    } else if (like < likes) {
      setLike(like + 1);
      getLikeDislike(like + 1, postId)
      setColor("white");
      setColor1("white");
    }
  };
  const dislikeButton = () => {
    if (like === likes) {
      setLike(like - 1);
      getLikeDislike(like - 1, postId)
      setColor1("red");
      setColor("white");
    } else if (like > likes) {
      setLike(like - 1);
      getLikeDislike(like - 1, postId)
      setColor1("white");
      setColor("white");
    }
  };

  return (
    <Card.Text as="div" style={{ display: "flex", gap: "10px" }}>
      <FontAwesomeIcon icon={faThumbsUp} color={color} onClick={likeButton} />
      <h6>Likes: {like}</h6>
      <FontAwesomeIcon
        icon={faThumbsDown}
        color={color1}
        onClick={dislikeButton}
      />
    </Card.Text>
  );
};
export default LikeDislike;
