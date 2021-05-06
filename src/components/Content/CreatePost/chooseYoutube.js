import React, { useRef, useState } from "react";
import {
  Container,
  Form,
  Row,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import ReactPlayer from "react-player/lazy";
import { useData } from "../../FirebaseComponents/firebaseFunctionsFiles";

const YoutubePost = ({ cancelPlayer }) => {
  const { createPostV } = useData();
  const [player, setPlayer] = useState(false);
  const [sendUrl, setSendUrl] = useState();
  const postText = useRef();
  const videoUrl = useRef();
  const [customError, setCustomError] = useState();

  // if url is correct user gets to post creation screen.
  const writePost = () => {
    let youtubeURL = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (
      videoUrl.current.value.match(youtubeURL) ||
      videoUrl.current.value.includes("soundcloud")
    ) {
      setPlayer(true);
      setSendUrl(videoUrl.current.value);
    } else {
      setCustomError("Bad Url, use only youtube or soundcloud links.");
    }
  };
  const cancelPost = () => {
    setPlayer(false);
    cancelPlayer();
  };
  //   here user confirms to create post and with createPostV post is put in database.
  const confirmPost = () => {
    createPostV(postText.current.value, sendUrl);
    setPlayer(false);
    cancelPlayer();
  };
  let beforeUrl = (
    <>
      <InputGroup size="sm" className="mb-3">
        <FormControl
          ref={videoUrl}
          style={{ color: "rgb(79, 59, 120)" }}
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
          placeholder="Add Youtube or Soundcloud url"
        />
      </InputGroup>
      <h5 style={{ color: "red", textAlign: "center" }}>{customError}</h5>
      <Row style={{ display: "flex", justifyContent: "space-around" }}>
        <Button bsPrefix="chooseButton" onClick={cancelPlayer}>
          Cancel
        </Button>
        <Button bsPrefix="chooseButton" onClick={writePost}>
          Confirm
        </Button>
      </Row>
    </>
  );

  if (player) {
    beforeUrl = (
      <>
        <ReactPlayer controls={true} width="450px" url={sendUrl} />
        <Form.Group
          controlId="exampleForm.ControlTextarea1"
          style={{ marginTop: "20px", marginBottom: "50px" }}
        >
          <Form.Control
            as="textarea"
            rows={9}
            style={{
              resize: "none",
              width: "450px",
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
          <Button bsPrefix="chooseButton" onClick={cancelPost}>
            Cancel
          </Button>
          <Button bsPrefix="chooseButton" onClick={confirmPost}>
            Confirm
          </Button>
        </Row>
      </>
    );
  }

  return <Container>{beforeUrl}</Container>;
};

export default YoutubePost;
