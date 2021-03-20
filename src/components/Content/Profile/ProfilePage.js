import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Profile from "./Profile";
import Post from "../Posts/post";
import { useAuth } from "../../FirebaseComponents/firebaseFunctionsAuth";
import AllPostsAssign from "../../../AllPostsAssign";

const ProfilePage = () => {
  const { currentUser, updated } = useAuth();

  const filterPosts = AllPostsAssign().filter(
    (x) => x.user.userId === currentUser.uid
  );

  return (
    <Container fluid style={{ padding: "0", margin: "0" }}>
      <Row>
        <Col>
          <Profile />
          {updated ? (
            <h5 style={{ color: "lightGreen", marginLeft: "20px" }}>
              Password successfully changed
            </h5>
          ) : (
            <></>
          )}
        </Col>
        <Col>
          {filterPosts.map((postData) => (
            <Post key={postData.id} postData={postData} />
          ))}
        </Col>
        <button
          onClick={() => window.scrollTo(0, 0)}
          style={{
            position: "fixed",
            bottom: "0vw",
            right: "0vw",
            color: "whitesmoke",
            backgroundColor: "rgb(79,59,120)",
          }}
        >
          Go Top
        </button>
      </Row>
    </Container>
  );
};

export default ProfilePage;
