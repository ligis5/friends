import React, { useState } from "react";
import { Card, Image, Col, Row, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useData } from "../FirebaseComponents/firebaseFunctionsFiles";
import Tilt from "react-tilt";
import basicUser from ".././basicUser.png";
import "./Profile.css";
import AboutMe from './AboutMe';


const Profile = () => {
  const { userPhoto, userData } = useData();
  const [userName, setUserName] = useState();
//   const [profilePhoto, setProfilePhoto] = useState(userPhoto);
  
//   const handleAddPhoto = (e) => {
//     const reader = new FileReader();
//     const file = e.target.files[0];
//     createUserProfilePhoto(file);
//     if (file) {
//       reader.onloadend = () => {
//         setProfilePhoto(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//  const userProfileButton = () => {
//    if(!userName){
//      alert('Add profile photo and user name.')
//    }else{
//     setUserProfile()
//     createUserProfile(userName);
//    }
    
//  }


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
            <Tilt className="TiltProfile" options={{ max: 10, scale: 1.05 }}>
              <Card.Img
                className="profileImage"
                src={userData ? userPhoto : basicUser}
              />
            </Tilt>
          </a>
          <Container>
            <Row>
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
                    // onChange={handleAddPhoto}
                  />
                </div>
              </label>
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
