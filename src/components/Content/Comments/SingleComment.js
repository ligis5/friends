import React, { useState } from "react";
import { Card, Container, Row } from "react-bootstrap";
import { useData } from "../../FirebaseComponents/firebaseFunctionsFiles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import LikeDislike from "../../LikeDislike";
import { useHistory } from "react-router-dom";

const SingleComment = ({ comment, id }) => {
  const { storageRef, userData, deleteComment } = useData();
  const [commentPhoto, setCommentPhoto] = useState();
  const [trashColor, setTrashColor] = useState("aliceblue");
  const history = useHistory();

  if (comment.userPhoto) {
    storageRef
      .child(comment.userPhoto)
      .getDownloadURL()
      .then((url) => {
        setCommentPhoto(url);
      });
  }
  // When delete comment is clicked it will make it color red and if it clicked again whithin 5seconds
  // it will delete comment, other wise it will turn back to white.
  const mightDeleteComment = async () => {
    if (trashColor === "red") {
      await deleteComment(id);
    }
    setTrashColor("red");
    setTimeout(() => {
      setTrashColor("aliceblue");
    }, 5000);
  };

  return (
    <Card.Body style={{ padding: "0", minHeight: "fit-content" }}>
      <Container style={{ border: "1px solid rgb(240,248,255,0.2)" }}>
        <p
          style={{
            fontSize: "80%",
            textAlign: "start",
            marginBottom: "8px",
          }}
        >
          {comment.comment}
        </p>
        <Row style={{ display: "flex", justifyContent: "space-between" }}>
          <Row style={{ marginLeft: "5px" }}>
            {commentPhoto ? (
              <img
                onClick={() => history.push(`/profile/${comment.userId}`)}
                style={{ cursor: "pointer", objectFit: "cover" }}
                alt={comment.UserName}
                src={commentPhoto}
                width="30px"
                height="30px"
              />
            ) : (
              <></>
            )}

            <p
              style={{
                fontSize: "70%",
                marginLeft: "5px",
                marginBottom: "0",
                marginTop: "auto",
              }}
            >
              {comment.UserName}
            </p>
            {comment.userId === userData.userId ? (
              <FontAwesomeIcon
                onClick={mightDeleteComment}
                icon={faTrash}
                style={{
                  color: trashColor,
                  cursor: "pointer",
                  marginLeft: "20px",
                  fontSize: "70%",
                  marginTop: "auto",
                  marginBottom: "2px",
                }}
              />
            ) : (
              <></>
            )}
          </Row>
          <div
            style={{
              fontSize: "70%",
              marginLeft: "auto",
              marginRight: "20px",
              marginBottom: "0",
              marginTop: "auto",
            }}
          >
            <LikeDislike
              collection="comments"
              id={id}
              likes={comment.likes}
              size={true}
            />
          </div>
          <p
            style={{
              fontSize: "70%",
              textAlign: "end",
              marginRight: "2px",
              marginBottom: "0",
              marginTop: "auto",
            }}
          >
            {comment.createdAt.toDate().toLocaleTimeString("en-US")}
          </p>
        </Row>
      </Container>
    </Card.Body>
  );
};

export default SingleComment;
