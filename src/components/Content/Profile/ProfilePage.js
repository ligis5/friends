import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Profile from "./Profile";
import Post from "../Posts/post";
import { useAuth } from "../../FirebaseComponents/firebaseFunctionsAuth";
import AllPostsAssign from "../../../AllPostsAssign";
import { faHtml5 } from "@fortawesome/free-brands-svg-icons";

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
      </Row>
    </Container>
  );
};

export default ProfilePage;
