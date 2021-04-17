import React, { useState } from "react";
import { Card, Button, Col, Row, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheck, faBan } from "@fortawesome/free-solid-svg-icons";
import { useData } from "../../FirebaseComponents/firebaseFunctionsFiles";
import "./Profile.css";
import AboutMe from "./AboutMe";
import imageCompression from "browser-image-compression";
import ChangePassword from "./ChangePassword";
import DeleteUser from "./DeleteUser";

const Profile = () => {
  const { userPhoto, userData, createUserProfilePhoto } = useData();
  const [newProfilePhoto, setNewProfilePhoto] = useState();
  const [confirmPhoto, setConfirmPhoto] = useState(false);
  const [photoFile, setPhotoFile] = useState();
  const [commentPhotoFile, setCommentPhotoFile] = useState();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  // options for big photo of user profile
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  // options for user photo user in comments.
  const optionsComment = {
    maxSizeMB: 0.2,
    maxWidthOrHeight: 60,
    useWebWorker: true,
  };

  const handleAddPhoto = async (e) => {
    const file = e.target.files[0];
    // file gets compressed into userProfile photo
    const compressedFile = await imageCompression(file, options);
    // file gets compressed into userProfile comment photo
    const compressedFileComment = await imageCompression(file, optionsComment);
    try {
      setPhotoFile(compressedFile);
      setCommentPhotoFile(compressedFileComment);
    } catch (error) {
      console.log(error);
    }
    if (compressedFile) {
      setNewProfilePhoto(URL.createObjectURL(compressedFile));
      setConfirmPhoto(true);
    }
  };

  const uploadPhoto = () => {
    // photoFile and commentPhotoFile is sent to storage, while newProfilePhoto is used as userPhoto until rerender.
    createUserProfilePhoto(photoFile, newProfilePhoto, commentPhotoFile);
    setConfirmPhoto(false);
  };
  const cancelPhoto = () => {
    setConfirmPhoto(false);
    setNewProfilePhoto();
  };
  // Destructure userData and take off what will not be needed in "About Me"
  const {
    profilePhoto,
    createdAt,
    email,
    userId,
    smallProfilePhoto,
    ...otherData
  } = userData || {};

  const sortedOtherData = Object.entries({ ...otherData }).sort(
    (a, b) => a[0].length - b[0].length
  );

  let joinedAt;
  if (createdAt) {
    joinedAt = createdAt.toDate().toDateString();
  }

  return (
    <Container style={{ marginTop: "20px", padding: "0" }}>
      <Card bsPrefix="Profile">
        <Col bsPrefix="userName">
          <h3 style={{ margin: "auto" }}>
            {userData ? userData.UserName : "Profile Name"}
          </h3>
        </Col>
        <Card.Body bsPrefix="user">
          <a href={userPhoto} target="_blank" rel="noreferrer">
            <Card.Img
              loading="lazy"
              className="profileImage"
              src={newProfilePhoto ? newProfilePhoto : userPhoto}
            />
          </a>
          <Container>
            <Row>
              {!confirmPhoto ? (
                <>
                  <label htmlFor="file-upload" className="file-upload">
                    <div className="fileUploadButton">
                      <FontAwesomeIcon
                        className="awesomeAboutPhoto"
                        icon={faEdit}
                        color="aliceblue"
                      />
                      <input
                        id="file-upload"
                        type="file"
                        accept="image/x-png, image/jpeg"
                        onChange={handleAddPhoto}
                      />
                    </div>
                  </label>
                </>
              ) : (
                <>
                  <FontAwesomeIcon
                    className="cancel-confirm"
                    style={{ margin: "5px 0 0 10px" }}
                    icon={faBan}
                    color="aliceblue"
                    onClick={cancelPhoto}
                  />
                  <FontAwesomeIcon
                    className="cancel-confirm"
                    style={{ marginLeft: "auto" }}
                    icon={faCheck}
                    color="aliceblue"
                    onClick={uploadPhoto}
                  />
                </>
              )}
            </Row>
            <h5 style={{ textAlign: "center" }}>About Me</h5>
            <br />
            <Row style={{ marginBottom: "20px" }}>
              {userData ? (
                // If user exists map users inforamtion and put in "About Me"
                sortedOtherData.map(([key, value]) => (
                  <AboutMe key={key} name={key} value={value} />
                ))
              ) : (
                <></>
              )}
            </Row>
            <Row
              bsPrefix
              style={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <Button
                onClick={handleShow}
                style={{
                  marginRight: "10px",
                  width: "100px",
                  display: "grid",
                  alignContent: "center",
                  fontSize: "90%",
                  fontWeight: "600",
                }}
                bsPrefix="chooseButton"
              >
                Change Password
              </Button>
              <ChangePassword handleClose={handleClose} show={show} />
              <Button
                onClick={handleShow1}
                style={{
                  marginRight: "10px",
                  width: "100px",
                  display: "grid",
                  alignContent: "center",
                  fontSize: "90%",
                  fontWeight: "600",
                  color: "aliceblue",
                  backgroundColor: "rgb(65, 5, 0)",
                }}
                bsPrefix="chooseButton"
              >
                Delete user
              </Button>
              <DeleteUser handleClose1={handleClose1} show1={show1} />
              <div style={{ alignSelf: "flex-end", marginLeft: "auto" }}>
                <p style={{ textAlign: "end", marginBottom: "0" }}>{email}</p>
                {joinedAt ? <>Joined at : {joinedAt.substring(4)}</> : <></>}
              </div>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;
