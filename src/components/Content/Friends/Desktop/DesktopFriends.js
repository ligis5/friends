import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Friend from "../Friend";
import { useData } from '../../../FirebaseComponents/firebaseFunctionsFiles';
import "./DesktopFriends.css";

const DesktopFriends = () => {
    const { allUsers, userData } = useData();
    const excludeOwner = allUsers.filter((u) => u.userId !== userData.userId);
    return (
        <Container className='deskFriends'>
            {excludeOwner.map((user) => (
                <Friend key={user.userId} user={user} />
              ))}
        </Container>
)
}

export default DesktopFriends;