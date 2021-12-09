import React from "react";
import PostProfile from "./PostProfile";
import AllPostsAssign from "../../../AllPostsAssign";
import Post from "../Posts/post";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const PostProfilePage = ({parentWidth}) => {
  const { user } = useParams();
  const allPosts = AllPostsAssign();

  const filterPosts =
    allPosts && allPosts.filter((x) => x.user.userId === user);

  return (
    <Container fluid='xxl' >
      
    <Row style={{width:'100%'}}>
    <Col style={{
                width:'100%',paddingRight:'0'
                  }}>
          <PostProfile user={user} parentWidth={parentWidth}/>
        </Col>
        <Col xl='6' lg="12"
              style={{
               justifyContent:parentWidth < 1200 ?'flex-start': "center",
                width:'100%', paddingRight:'0'
                  }}>
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
