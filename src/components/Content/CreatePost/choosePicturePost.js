import React, { useRef } from "react";
import { Form, Row, Button, Image, Container } from "react-bootstrap";
import { useData } from "../../FirebaseComponents/firebaseFunctionsFiles";

const ChoosePicturePost = ({ photoFile, newProfilePhoto, showButtons }) => {
  const { uploadPostPhoto } = useData();
  const postText = useRef();

  const ConfirmPost = () => {
    uploadPostPhoto(postText.current.value, photoFile);
    showButtons();
  };
  const CancelPost = () => {
    showButtons();
  };

  return (
    <Container>
      <Image
        style={{ width: "100%", maxHeight:'70vh', objectFit: "cover" }}
        src={newProfilePhoto ? newProfilePhoto : <></>}
      />
      <Form.Group
        controlId="exampleForm.ControlTextarea1"
        style={{ marginTop: "20px", marginBottom: "50px" }}
      >
        <Form.Control
          as="textarea"
          rows={9}
          style={{
            resize: "none",
            width: "100%",
            height: "100px",
            color: "rgb(56, 41, 84)",
            fontSize: "120%",
            fontWeight: "500",
            backgroundColor: "aliceblue",
          }}
          ref={postText}
        />
      </Form.Group>
      <Row style={{ display: "flex", justifyContent: "space-around" }}>
        <Button bsPrefix="chooseButton" onClick={CancelPost}>
          Cancel
        </Button>
        <Button bsPrefix="chooseButton" onClick={ConfirmPost}>
          Confirm
        </Button>
      </Row>
    </Container>
  );
};

export default ChoosePicturePost;
