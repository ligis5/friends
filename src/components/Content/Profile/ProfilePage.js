import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Profile from './Profile';
import Post from '../Posts/post';
import { useAuth } from '../../FirebaseComponents/firebaseFunctionsAuth';
import AllPostsAssign from '../../../AllPostsAssign';


const ProfilePage = () => {
const { currentUser } = useAuth();

  const filterPosts = AllPostsAssign().filter(x => x.user.userId === currentUser.uid
    )

  return (
    <Container fluid
    style={{padding:'0', margin:'0'}}
    > 
      <Row>
          <Col>
        <Profile/>
        </Col>
        <Col>
           {
            filterPosts.map((postData) => (
               <Post key={postData.id} postData={postData}
            />
            ))}
            </Col>
       </Row>
    </Container>
  );
};

export default ProfilePage;