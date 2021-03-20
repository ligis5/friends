import React, { useState, useRef } from "react";
import { Card, Button, Container, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useData } from "../../FirebaseComponents/firebaseFunctionsFiles";
import SingleComment from "./SingleComment";

const Comments = ({ id }) => {
  const { createComment, comments } = useData();
  const [writeComment, setWriteComment] = useState(false);
  const writtenComment = useRef();
  const cancelComment = () => {
    setWriteComment(false);
  };
  const confirmComment = async () => {
    if (writtenComment.current.value.length > 0) {
      createComment(writtenComment.current.value, id);
      cancelComment();
    }
  };
  const filterComments = comments.filter((c) => c.data().postId === id);

  return (
    <Container bsPrefix>
      <Card
        className="comments"
        style={{
          backgroundColor: "rgb(33, 27, 28)",
          borderTop: "1px solid aliceblue",
          borderLeft: "none",
          borderRight: "none",
          maxHeight: "250px",
          overflowY: "scroll",
        }}
      >
        {filterComments.map((c) => (
          <SingleComment key={c.id} id={c.id} comment={c.data()} />
        ))}
      </Card>
      {!writeComment ? (
        <Button
          onClick={() => setWriteComment(true)}
          style={{
            width: "150px",
            backgroundColor: "aliceblue",
            color: "purple",
            fontWeight: "600",
          }}
        >
          Write comment
        </Button>
      ) : (
        <Form style={{ display: "flex" }}>
          <FontAwesomeIcon
            className="cancel-confirm"
            icon={faBan}
            color="aliceblue"
            onClick={cancelComment}
          />

          <Form.Group style={{ margin: "0px" }}>
            <Form.Control
              ref={writtenComment}
              as="textarea"
              rows={9}
              style={{
                resize: "none",
                color: "rgb(56, 41, 84)",
                fontSize: "100%",
                fontWeight: "400",
                backgroundColor: "aliceblue",
                height: "70px",
                width: "430px",
                overflowY: "auto",
                marginTop: "20px",
              }}
            />
          </Form.Group>
          <FontAwesomeIcon
            className="cancel-confirm"
            style={{ marginLeft: "10px" }}
            icon={faCheck}
            color="aliceblue"
            onClick={confirmComment}
          />
        </Form>
      )}
    </Container>
  );
};

export default Comments;
