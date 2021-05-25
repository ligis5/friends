import React from "react";
import PostProfile from "./PostProfile";
import AllPostsAssign from "../../../AllPostsAssign";
import Post from "../Posts/post";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const PostProfilePage = () => {
  const { user } = useParams();
  const allPosts = AllPostsAssign();

  const filterPosts =
    allPosts && allPosts.filter((x) => x.user.userId === user);

  return (
    <Container fluid style={{ padding: "0", margin: "0" }}>
      <Row>
        <Col>
          <PostProfile user={user} />
        </Col>
        <Col>
          {filterPosts &&
            filterPosts.map((postData) => (
              <Post key={postData.id} postData={postData} />
            ))}
        </Col>
      </Row>
    </Container>
  );
};

export default PostProfilePage;
