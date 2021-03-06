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
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

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
    }
  };

  const uploadPhoto = () => {
    // photoFile is sent to storage, while newProfilePhoto is used as userPhoto until rerender.
    createUserProfilePhoto(photoFile, newProfilePhoto);
    setConfirmPhoto(false);
  };
  const cancelPhoto = () => {
    setConfirmPhoto(false);
    setNewProfilePhoto();
  };
  // Destructure userData and take off what will not be needed in "About Me"
  const { profilePhoto, createdAt, email, userId, ...otherData } =
    userData || {};

  const sortedOtherData = Object.entries({ ...otherData }).sort(
    (a, b) => a[0].length - b[0].length
  );

  let joinedAt;
  if (createdAt) {
    joinedAt = createdAt.toDate().toDateString();
  }

  return (
    <Container style={{ maxWidth: "100%", marginTop: "20px" }}>
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
                  <button className="aboutMe-button">
                    <FontAwesomeIcon
                      style={{ color: "red" }}
                      className="awesomeAbout"
                      icon={faBan}
                      color="aliceblue"
                      onClick={cancelPhoto}
                    />
                  </button>
                  <button
                    style={{ marginLeft: "auto" }}
                    className="aboutMe-button"
                    id="onOff1"
                    onClick={uploadPhoto}
                  >
                    <FontAwesomeIcon
                      style={{ color: "green" }}
                      className="awesomeAbout"
                      icon={faCheck}
                      color="aliceblue"
                    />
                  </button>
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
