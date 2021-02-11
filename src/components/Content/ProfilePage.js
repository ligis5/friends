import React from "react";
import { Container } from "react-bootstrap";
import Profile from './Profile';
import './Profile.css';



const ProfilePage = () => {

 

 
  

//   const handleAddPhoto = (e) => {
//     const reader = new FileReader();
//     const file = e.target.files[0];
//     createUserProfilePhoto(file);
//     if (file) {
//       reader.onloadend = () => {
//         setProfilePhoto(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//  const userProfileButton = () => {
//    if(!userName){
//      alert('Add profile photo and user name.')
//    }else{
//     setUserProfile()
//     createUserProfile(userName);
//    }
    
//  }

  return (
  <Container style={{maxWidth:'100%'}}>
        <Profile/>
  </Container>
  );
};

export default ProfilePage;