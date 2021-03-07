import React, { useRef } from "react";
import { Form, Row, Button } from "react-bootstrap";
import { useData } from "../../FirebaseComponents/firebaseFunctionsFiles";

const ChooseTextPost = ({ textFalse, text }) => {
  const postText = useRef();
  const { createPostT } = useData();

  const textTrue = () => {
    textFalse();
    createPostT(postText.current.value);
  };
  return (
    <>
      <Form.Group
        controlId="exampleForm.ControlTextarea1"
        style={{ marginTop: "20px", marginBottom: "50px" }}
      >
        <Form.Control
          as="textarea"
          rows={9}
          style={{
            resize: "none",
            color: "rgb(56, 41, 84)",
            fontSize: "120%",
            fontWeight: "500",
            backgroundColor: "aliceblue",
          }}
          ref={postText}
        />
      </Form.Group>
      <Row style={{ display: "flex", justifyContent: "space-around" }}>
        {text ? (
          <>
            <Button bsPrefix="chooseButton" onClick={textFalse}>
              Cancel
            </Button>
            <Button bsPrefix="chooseButton" onClick={textTrue}>
              Confirm
            </Button>
          </>
        ) : (
          <></>
        )}
      </Row>
    </>
  );
};

export default ChooseTextPost;
