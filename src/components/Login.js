import React, {useState} from 'react';
import {Form, Button, Row, Container} from 'react-bootstrap';
import './Login.css';
import { googleAuth, auth } from './firebase';



const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState('none');
    
    
    

    
      
    const loginWithEmail = async () => {
        try{
            await auth.signInWithEmailAndPassword(email, password);
        }catch(error){
            setVisible('');
            setEmail('');
        setPassword('');
            console.log(error)
        }
    }

    const updateEmail = e => {
        setEmail(e.target.value);
    }
    const updatePassword = e => {
        setPassword(e.target.value);
    }
    const getLogin = e => {
        e.preventDefault();
         setVisible('none');
         loginWithEmail();
         setEmail('');
        setPassword('');
        
    
            
        
    }



    return (
        <Container>
        <h1 style={{color: 'aliceblue', textAlign:'center'}}>Login</h1>
            <Form onSubmit={getLogin}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                     onChange={updateEmail} required
                    type="email" placeholder="Enter email" value={email || ''} />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={updatePassword} required
                    value={password || ''} type="password" placeholder="Password" />
                </Form.Group>
                <Row style={{gap:'30px', marginLeft:'10px'}}>
                        <Button
                        bsPrefix='formButton' variant="primary" type="submit">
                            Submit
                        </Button>
                        <Button
                        bsPrefix='formButton' className='google' 
                        variant="primary" onClick={googleAuth}>
                            Google
                        </Button>
                        <h5 style={{marginLeft:'20px', display:visible, color:'#da1c1c'}}>
                        Wrong email or password
                        </h5>
                </Row>
            </Form>
        </Container>
    )
}


export default Login;