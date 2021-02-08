import React, { useRef, useState } from "react";
import { Card, Image, Col } from "react-bootstrap";
import addPhoto from "./addPhoto.png";
import "./NameAndPhoto.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faBan } from "@fortawesome/free-solid-svg-icons";
import { useData } from '../FirebaseComponents/firebaseFunctionsFiles';
import Tilt from 'react-tilt';
import { Link, useHistory } from 'react-router-dom';



const NameAndPhoto = () => {
  const history = useHistory();
  const { createUserProfilePhoto, createUserProfile, setUserProfile } = useData();
  const userName = useRef();
  const [profilePhoto, setProfilePhoto] = useState();
 



  const handleAddPhoto = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    createUserProfilePhoto(file);
    if (file) {
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

 const userProfileButton = () => {
   if(!userName.current.value){
     alert('Add profile photo and user name.')
   }else{
    setUserProfile()
    createUserProfile(userName.current.value);
    history.push('/')
   }
    
 }

  return (
    <Card bsPrefix="Card">
      <Col className="cardTitle">
        <h3>Profile Photo</h3>
      </Col>
      <Card.Body bsPrefix="cardBody">
        <label htmlFor="file-upload" className="custom-file-upload">
          {profilePhoto ? (
            <Tilt className='Tilt' options={{ max : 10, scale: 1.05 }}>
            <Card.Img className="userImage" src={profilePhoto} />
            </Tilt>
          ) : (
            <Image className="addUserImage" src={addPhoto} />
          )}
        </label>
        <input id="file-upload" type="file" accept='image/x-png, image/jpeg'
        onChange={handleAddPhoto} />
        <Card.Body className="cardBottom">
          <button className="cancel">
            <FontAwesomeIcon
              icon={faBan}
              style={{
                backgroundColor: "rgb(207, 55, 55)",
                borderRadius: "50%",
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
          <button className="confirm" 
          onClick={userProfileButton}
          >
            <FontAwesomeIcon
              icon={faCheck}
              style={{
                backgroundColor: "rgb(29, 161, 29)",
                borderRadius: "50%",
              }}
            />
          </button>
        </Card.Body>
      </Card.Body>
    </Card>
  );
};

export default NameAndPhoto;