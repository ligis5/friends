import React from "react";
import { Container } from "react-bootstrap";
import Profile from './Profile';
import './Profile.css';



const ProfilePage = () => {

  return (
  <Container style={{maxWidth:'100%'}}>
        <Profile/>
  </Container>
  );
};

export default ProfilePage;