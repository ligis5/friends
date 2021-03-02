import React, { useState, useEffect } from "react";
import { Card, Col, Row, Container } from "react-bootstrap";
import { useData } from "../../FirebaseComponents/firebaseFunctionsFiles";
import "../Profile/Profile.css";

const Profile = ({user}) => {
  const [clickedUserData, setClickedUserData] = useState();
  const [userPhoto, setUserPhoto] = useState();
  const { allUsers, storageRef } = useData();


  useEffect(() => {
    allUsers.forEach((x) => {
      if (user === x.userId) {
        storageRef
      .child(x.profilePhoto)
      .getDownloadURL()
      .then((url) => {
        setUserPhoto(url);
      });
      setClickedUserData(x);
      }
    });
  }, [user]);
  
  const { createdAt, email, profilePhoto, userId, ...otherData } =
  clickedUserData || {};

  let joinedAt;
  if (createdAt) {
    joinedAt = createdAt.toDate().toDateString();
  }

  return (
    <Container style={{ maxWidth: "100%", marginTop:'20px'}}>
      <Card bsPrefix="Profile">
        <Col bsPrefix="userName">
          <h3 style={{ margin: "auto" }}>
            {clickedUserData ? clickedUserData.UserName : "Profile Name"}
          </h3>
        </Col>
        <Card.Body bsPrefix="user">
          <a href={userPhoto} target="_blank" rel='noreferrer'>
            <Card.Img className="profileImage" src={userPhoto} />
          </a>
          <Container>
            <h5 style={{ textAlign: "center" }}>About {clickedUserData ? clickedUserData.UserName : "Profile Name"}</h5>
            <br />
            <Row style={{ display: "grid" }}>
              {Object.entries({ ...otherData }).map(([key, value]) => (
                <p key={key}>
                  {key}: {value}{" "}
                </p>
              ))}
            </Row>
            <Row style={{ marginLeft: "auto", width: "max-content" }}>
              {joinedAt ? <>Joined at : {joinedAt.substring(4)}</> : <></>}
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;
