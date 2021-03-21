import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import ChooseTextPost from "./chooseTextPost";
import ChoosePicturePost from "./choosePicturePost";
import YoutubePost from "./chooseYoutube";
import imageCompression from "browser-image-compression";
import "./CreatePost.css";

const CreatePost = () => {
  const [hideButtons, setHideButtons] = useState(false);
  const [text, setText] = useState(false);
  const [getUrl, setGetUrl] = useState(false);
  const [newProfilePhoto, setNewProfilePhoto] = useState();
  const [confirmPhoto, setConfirmPhoto] = useState(false);
  const [photoFile, setPhotoFile] = useState();

  const showButtons = () => {
    setHideButtons(false);
    setNewProfilePhoto();
    setPhotoFile();
    setConfirmPhoto(false);
  };
  // "Text post creation"
  const changeText = () => {
    setText(true);
    setHideButtons(true);
  };
  const textFalse = () => {
    setText(false);
    showButtons();
  };

  const choosePlayer = () => {
    setGetUrl(true);
  };
  const cancelPlayer = () => {
    setGetUrl(false);
  };

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  const handleAddPhoto = async (e) => {
    const file = e.target.files[0];
    const compressedFile = await imageCompression(file, options);
    try {
      await setPhotoFile(compressedFile);
    } catch (error) {
      console.log(error);
    }
    if (compressedFile) {
      setNewProfilePhoto(URL.createObjectURL(compressedFile));
      setConfirmPhoto(true);
      setHideButtons(true);
    }
  };
  let choosePost = (
    <h4 style={{ color: "aliceblue", textAlign: "center" }}>
      Choose a type of post you wish to make
    </h4>
  );
  if (text) {
    choosePost = <ChooseTextPost text={text} textFalse={textFalse} />;
  }
  if (confirmPhoto) {
    choosePost = (
      <ChoosePicturePost
        confirmPhoto={confirmPhoto}
        photoFile={photoFile}
        newProfilePhoto={newProfilePhoto}
        showButtons={showButtons}
      />
    );
  }

  if (getUrl) {
    choosePost = (
      <YoutubePost
        getUrl={getUrl}
        choosePlayer={choosePlayer}
        cancelPlayer={cancelPlayer}
      />
    );
  }

  return (
    <Container
      className="createPost"
      style={{
        border: "solid aliceblue 1px",
        width: "500px",
        height: "max-content",
        marginLeft: "20px",
        marginTop: "20px",
      }}
    >
      {!hideButtons ? (
        <Row>
          <Col style={{ display: "flex", justifyContent: "space-around" }}>
            <Button bsPrefix="chooseButton" onClick={changeText}>
              Text
            </Button>
            <label htmlFor="file-upload" className="custom-file-upload">
              <div className="choosePhoto chooseButton">
                <FontAwesomeIcon
                  icon={faImage}
                  style={{ fontSize: "200%", backgroundColor: "aliceblue" }}
                />
              </div>
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/x-png, image/jpeg"
              onChange={handleAddPhoto}
            />
            <Button bsPrefix="chooseButton" onClick={choosePlayer}>
              <FontAwesomeIcon
                icon={faYoutube}
                style={{ fontSize: "200%", backgroundColor: "aliceblue" }}
              />
            </Button>
          </Col>
        </Row>
      ) : (
        <></>
      )}
      {choosePost}
    </Container>
  );
};

export default CreatePost;
