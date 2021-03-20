import React, { useRef, useState, useEffect } from "react";
import { Card, Image, Col } from "react-bootstrap";
import addPhoto from "./addPhoto.png";
import "./NameAndPhoto.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faBan } from "@fortawesome/free-solid-svg-icons";
import { useData } from "../FirebaseComponents/firebaseFunctionsFiles";
import Tilt from "react-tilt";
import { useHistory } from "react-router-dom";
import imageCompression from "browser-image-compression";
import ReactLoading from "react-loading";

const NameAndPhoto = () => {
  const history = useHistory();
  const { createUserProfilePhoto, createUserProfile, UserProfile } = useData();
  const userName = useRef();
  const [profilePhoto, setProfilePhoto] = useState();
  const [photoFile, setPhotoFile] = useState();
  const [commentPhotoFile, setCommentPhotoFile] = useState();
  const [loading, setLoading] = useState(true);

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  const optionsComment = {
    maxSizeMB: 0.2,
    maxWidthOrHeight: 60,
    useWebWorker: true,
  };

  const handleAddPhoto = async (e) => {
    const file = e.target.files[0];
    try {
      const compressedFile = await imageCompression(file, options);
      const compressedFileComment = await imageCompression(
        file,
        optionsComment
      );
      setPhotoFile(compressedFile);
      setCommentPhotoFile(compressedFileComment);
    } catch (error) {
      console.log(error);
    }
    if (file) {
      setProfilePhoto(URL.createObjectURL(file));
    }
  };

  const userProfileButton = async () => {
    await createUserProfilePhoto(photoFile, profilePhoto, commentPhotoFile);
    if (!userName.current.value || !profilePhoto) {
      alert("Add profile photo and user name.");
    } else {
      UserProfile();
      createUserProfile(userName.current.value);
      history.push("/");
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => setLoading(true);
  }, []);

  return (
    <Card bsPrefix="Card">
      {loading ? (
        <ReactLoading type="bars" color="aliceblue" height={667} width={667} />
      ) : (
        <>
          <Col className="cardTitle">
            <h3>Profile Photo</h3>
          </Col>
          <Card.Body bsPrefix="cardBody">
            <label htmlFor="file-upload" className="custom-file-upload">
              {profilePhoto ? (
                <Tilt className="Tilt" options={{ max: 10, scale: 1.05 }}>
                  <Card.Img className="userImage" src={profilePhoto} />
                </Tilt>
              ) : (
                <Image className="addUserImage" src={addPhoto} />
              )}
            </label>
            <p style={{ textAlign: "center" }}>Click + to choose photo</p>
            <input
              id="file-upload"
              type="file"
              accept="image/x-png, image/jpeg"
              onChange={handleAddPhoto}
            />
            <Card.Body className="cardBottom">
              <button className="cancel">
                <FontAwesomeIcon
                  icon={faBan}
                  style={{
                    backgroundColor: "rgb(207, 55, 55)",
                    borderRadius: "50%",
                    color: "aliceblue",
                  }}
                />
              </button>
              <input
                className="nameInput"
                type="name"
                placeholder="User Name"
                size="12"
                ref={userName}
              />
              <button className="confirm" onClick={userProfileButton}>
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{
                    backgroundColor: "rgb(29, 161, 29)",
                    borderRadius: "50%",
                    color: "aliceblue",
                  }}
                />
              </button>
            </Card.Body>
          </Card.Body>
        </>
      )}
    </Card>
  );
};

export default NameAndPhoto;
