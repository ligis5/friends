import React from "react";
import PostProfile from "./PostProfile";
import AllPostsAssign from "../../../AllPostsAssign";
import Post from "../Posts/post";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const PostProfilePage = () => {
  const { user } = useParams();

  const filterPosts = AllPostsAssign().filter((x) => x.user.userId === user);

  return (
    <Container fluid style={{ padding: "0", margin: "0" }}>
      <Row>
        <Col>
          <PostProfile user={user} />
        </Col>
        <Col style={{ marginRight: "20px", padding: "0" }}>
          {filterPosts.map((postData) => (
            <Post key={postData.id} postData={postData} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default PostProfilePage;
