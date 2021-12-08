import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Profile from "./Profile";
import Post from "../Posts/post";
import { useAuth } from "../../FirebaseComponents/firebaseFunctionsAuth";
import AllPostsAssign from "../../../AllPostsAssign";

const ProfilePage = ({parentWidth}) => {
  const { currentUser, updated } = useAuth();
  const allPosts = AllPostsAssign();

  const filterPosts =
    allPosts && allPosts.filter((x) => x.user.userId === currentUser.uid);

  return (
    <Container fluid='xxl' style={{width:'100%'}}>
      <Row style={{width:'100%'}}>
        <Col xl='6' lg="12" style={{width:'100%',paddingRight:'0'}}>
          <Profile />
          {updated ? (
            <h5 style={{ color: "lightGreen", marginLeft: "20px" }}>
              Password successfully changed
            </h5>
          ) : (
            <></>
          )}
        </Col>
        <Col xl='6' lg="12" style={{ display: "grid",
               justifyContent:'center',
                width:'100%', paddingRight:'0'
                  }}>
          {filterPosts &&
            filterPosts.map((postData) => (
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
