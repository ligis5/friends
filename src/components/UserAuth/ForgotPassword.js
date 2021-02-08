import React, {useState, useRef} from 'react';
import {Form, Button, Row, Container} from 'react-bootstrap';
import { useAuth } from '../FirebaseComponents/firebaseFunctionsAuth';
import { useHistory } from 'react-router-dom';

const ForgotPassword = () => {
    const { forgotPassword } = useAuth();
    const history = useHistory();
    const Email = useRef();
    const [loading, setLoading] = useState(false)
    
    
    const userLogin = async () => {
            try{
                setLoading(true)
                await forgotPassword(Email.current.value)
              alert('Email has been sent check your inbox')
              history.push('/login')
            } catch(error){
                console.log(error);
                if(error.code === 'auth/user-not-found'){
                    alert('Email does not exist in our database')
                }
            }
    }
    

    const changePassword = e => {
        e.preventDefault();
        userLogin();
        e.target.reset();
        setLoading(false)
    }

    


    return (
        <Container>
          <h1 style={{
              color: 'aliceblue', textAlign:'center', textShadow:'2px -2px rgb(15, 72, 133)'
              }}>Forgot Password</h1>
            <Form onSubmit={changePassword}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control required
                    type="email" placeholder='Enter Email' ref={Email} />
                </Form.Group>
                <Row style={{gap:'30px', marginLeft:'10px'}}>
                    <Button
                    bsPrefix='formButton' variant="primary" type="submit">
                        Confirm
                    </Button>
                </Row>
            </Form>
        </Container>
    )
}


export default ForgotPassword;