import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  Col,
  Row,
  Container,
  OverlayTrigger,
  Button,
  Popover,
} from "react-bootstrap";
import { useData } from "../../FirebaseComponents/firebaseFunctionsFiles";
import "../Profile/Profile.css";

const Profile = ({ user }) => {
  const history = useHistory();
  const [clickedUserData, setClickedUserData] = useState();
  const [userPhoto, setUserPhoto] = useState();
  const [hidePopup, setHidePopup] = useState();
  const [loading, setLoading] = useState(false);
  const { allUsers, storageRef, deleteFriend } = useData();
  const mounted = useRef(true);

  useEffect(() => {
    allUsers.forEach((x) => {
      if (user === x.userId) {
        storageRef
          .child(x.profilePhoto)
          .getDownloadURL()
          .then((url) => {
            mounted.current && setUserPhoto(url);
            setLoading(true);
          });
        mounted.current && setClickedUserData(x);
      }
    });
    return () => (mounted.current = false);
  }, [user]);
  const {
    createdAt,
    email,
    profilePhoto,
    userId,
    smallProfilePhoto,
    ...otherData
  } = clickedUserData || {};

  let joinedAt;
  if (createdAt) {
    joinedAt = createdAt.toDate().toDateString();
  }

  const unfriend = () => {
    deleteFriend(userId);
    setHidePopup(false);
    history.push("/");
  };

  return (
    <Container style={{ marginTop: "10px" }}>
      {loading ? (
        <Card bsPrefix="Profile">
          <Col bsPrefix="userName">
            <h3 style={{ margin: "auto" }}>
              {clickedUserData ? clickedUserData.UserName : "Profile Name"}
            </h3>
          </Col>
          <Card.Body bsPrefix="user">
            <a href={userPhoto} target="_blank" rel="noreferrer">
              <Card.Img className="profileImage" src={userPhoto} />
            </a>
            <Container>
              <h5 style={{ textAlign: "center" }}>
                About{" "}
                {clickedUserData ? clickedUserData.UserName : "Profile Name"}
              </h5>
              <br />
              <Row style={{ display: "grid" }}>
                {Object.entries({ ...otherData }).map(([key, value]) => (
                  <p key={key}>
                    {key}: {value}{" "}
                  </p>
                ))}
              </Row>
              <Row
                style={{
                  display: "flex",
                }}
              >
                {otherData.status && (
                  <OverlayTrigger
                    show={hidePopup}
                    trigger="click"
                    key="right"
                    placement="right"
                    overlay={
                      <Popover id={"popover-positioned-right"}>
                        <Popover.Title
                          style={{
                            fontSize: "large",
                            color: "rgb(79, 59, 120)",
                          }}
                          as="h3"
                        >
                          Unfriend this user?
                        </Popover.Title>
                        <Popover.Content>
                          <Row
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                            }}
                          >
                            <Button
                              bsPrefix="chooseButton"
                              onClick={() => setHidePopup(false)}
                            >
                              Cancel
                            </Button>
                            <Button onClick={unfriend} bsPrefix="chooseButton">
                              Confirm
                            </Button>
                          </Row>
                        </Popover.Content>
                      </Popover>
                    }
                  >
                    <button
                      onClick={() => setHidePopup(true)}
                      style={{
                        backgroundColor: "rgb(79, 59, 120)",
                        color: "aliceblue",
                      }}
                    >
                      Unfriend
                    </button>
                  </OverlayTrigger>
                )}

                <div style={{ marginLeft: "auto" }}>
                  {joinedAt ? <>Joined at : {joinedAt.substring(4)}</> : <></>}
                </div>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      ) : (
        <h1 style={{ color: "aliceblue", textAlign: "center" }}>...Loading</h1>
      )}
    </Container>
  );
};

export default Profile;
