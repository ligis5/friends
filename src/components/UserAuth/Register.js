import React, {useState, useRef} from 'react';
import {Form, Button, Row, Container} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../FirebaseComponents/firebaseFunctionsAuth';

const Register = () => {
    const { register, currentUser } = useAuth();
    const history = useHistory();
    const regEmail = useRef();
    const regPassword = useRef();
    const regConfirmPassword = useRef();
    const [pswDontMatch, setPswDontMatch] = useState('none');
    const [loading, setLoading] = useState(false)
    const [emailInUse, setEmailInUse] = useState('none');
    
    
    
    const userRegister = async () => {
        if(regConfirmPassword.current.value !== regPassword.current.value){
            setPswDontMatch('');
            setEmailInUse('none');
        }else{
            try{
                setLoading(true)
               register(regEmail.current.value, regPassword.current.value)
               if(currentUser){
                history.push('/name-photo')
               }
            } catch(error){
                console.log(error);
                if(error.code === 'auth/email-already-in-use'){
                    setEmailInUse('');
                    setPswDontMatch('none');
                }
            }
        }
        setLoading(false)
    }


    const getRegister = e => {
        e.preventDefault();
        userRegister();
        e.target.reset();
    }

    
    return (
        <Container>
          <h1 style={{color: 'aliceblue', textAlign:'center'}}>Register</h1>
            <Form onSubmit={getRegister}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label style={{display: 'flex'}}>Email address
                    <p style={{marginLeft:'20px', marginBottom:'0', display:emailInUse, color:'#da1c1c'}}>
                    Email already in use
                    </p>
                    </Form.Label>
                    <Form.Control required
                    type="email" placeholder='Email' ref={regEmail} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required
                    ref={regPassword} type="password" placeholder="Password" />
                </Form.Group>
                    
                <Form.Group controlId="formBasicPassword">
                    <Form.Label style={{display: 'flex'}}>Confirm Password
                    <p style={{marginLeft:'20px', marginBottom:'0', display:pswDontMatch, color:'#da1c1c'}}>
                    Passwords dont match
                    </p>
                    </Form.Label>
                    <Form.Control required
                    ref={regConfirmPassword} type="password" placeholder="Confirm Password"/>
                </Form.Group>
                <Row style={{gap:'30px', marginLeft:'10px'}}>
                    <Button
                    bsPrefix='formButton' variant="primary" type="submit">
                        Register
                    </Button>
                </Row>
            </Form>
        </Container>
    )
}


export default Register;