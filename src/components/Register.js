import React, {useState} from 'react';
import {Form, Button, Row, Container, Col} from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import {auth} from './firebase';

const Register = ({history}) => {
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [regConfirmPassword, setRegConfirmPassowrd] = useState('');
    const [visible, setVisible] = useState('none');

    
    const updateEmail = e => {
        setRegEmail(e.target.value);
    }

    const newPassword = e => {
        setRegPassword(e.target.value);
    }

    const confirmPassword = e => {
        setRegConfirmPassowrd(e.target.value);
    }

    const checkPasswords = async () => {
        if(regConfirmPassword !== regPassword){
            setVisible('');
        }else{
            try{
                const { user } = await auth.createUserWithEmailAndPassword(regEmail, regPassword);
            } catch(error){
                console.log(error);
            }
            history.push('/login')
        }
    }

    const getLogin = e => {
        e.preventDefault();
        setRegEmail('');
        setRegPassword('');
        setRegConfirmPassowrd('')
        checkPasswords();
    }

    


    return (
        <Container>
          <h1 style={{color: 'aliceblue', textAlign:'center'}}>Register</h1>
            <Form onSubmit={getLogin}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={updateEmail} required
                    type="email" placeholder="Enter email" value={regEmail || ''} />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={newPassword} required
                    value={regPassword || ''} type="password" placeholder="Password" />
                </Form.Group>
                    
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control onChange={confirmPassword} required
                    value={regConfirmPassword || ''} type="password" placeholder="Confirm Password"/>
                </Form.Group>
                <Row style={{gap:'30px', marginLeft:'10px'}}>
                    <Button
                    bsPrefix='formButton' variant="primary" type="submit">
                        Register
                    </Button>
                    <h5 style={{marginLeft:'20px', display:visible, color:'#da1c1c'}}>
                    Passwords dont match
                    </h5>
                </Row>
            </Form>
        </Container>
    )
}


export default withRouter(Register);