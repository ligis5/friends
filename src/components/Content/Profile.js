import React, { useState } from "react";
import { Card, Image, Col, Row, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheck, faBan  } from "@fortawesome/free-solid-svg-icons";
import { useData } from "../FirebaseComponents/firebaseFunctionsFiles";
import "./Profile.css";
import AboutMe from './AboutMe';


const Profile = () => {
  const { userPhoto, userData, createUserProfilePhoto, updateUserProfile } = useData();
  const [newProfilePhoto, setNewProfilePhoto] = useState();
  const [confirmPhoto, setConfirmPhoto] = useState(false)
  const [photoFile, setPhotoFile] = useState();
  


  const handleAddPhoto = (e) => {
    const file = e.target.files[0];
    setPhotoFile(file)
    if (file) {
        setNewProfilePhoto(URL.createObjectURL(file));
      setConfirmPhoto(true)
    }
  };
  

  const uploadPhoto = () => {
    createUserProfilePhoto(photoFile, newProfilePhoto);
    setConfirmPhoto(false)
  }
  const cancelPhoto = () => {
    setConfirmPhoto(false)
  }

  const { profilePhoto, createdAt, email, ...otherData } = userData || {};

let joinedAt;
if(createdAt){
  joinedAt = createdAt.toDate().toDateString()
}

  return (
    <Container style={{maxWidth:'100%'}}>
      <Card bsPrefix="Profile">
        <Col bsPrefix="userName">
          <h3 style={{margin:'auto'}}>
            {userData ? userData.UserName : "Profile Name"}
          </h3>
        </Col>
        <Card.Body bsPrefix="user">
          <a href={userPhoto} target="_blank">
              <Card.Img
                className="profileImage"
                src={newProfilePhoto ? newProfilePhoto : userPhoto}
              />
          </a>
          <Container>
            <Row>
              {!confirmPhoto ?
                <>
                <label htmlFor="file-upload" className="file-upload" >
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
              :
              <>
              <button className="aboutMe-button">
                       <FontAwesomeIcon
                         className="awesomeAbout"
                         icon={faBan}
                         color="aliceblue"
                         onClick={cancelPhoto}
                       />
                     </button>
                     <button style={{marginLeft:'auto'}}
                       className="aboutMe-button"
                       id="onOff1"
                       onClick={uploadPhoto}
                     >
                       <FontAwesomeIcon
                         className="awesomeAbout"
                         icon={faCheck}
                         color="aliceblue"
                       />
                     </button>
              </>
              }
              
            </Row>
            <h5 style={{ textAlign: "center" }}>About Me</h5>
            <br />
            <Row style={{marginBottom:'20px'}}>
            { userData ?
                Object.entries({...otherData}).map(([key, value]) => (
                <AboutMe key={key} name={key} value={value} />
                ))
                :
                <></>
            }
            </Row>
            <Row style={{marginLeft:'auto', width:'max-content'}}>
            {joinedAt? joinedAt.substring(4) : <></>}
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;
