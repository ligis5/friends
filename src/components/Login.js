import React, {useState, useEffect} from 'react';
import {Form, Button, Row} from 'react-bootstrap';
import './Login.css';

const Login = ({confirmLogin, afterLogin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState('none');
    

    useEffect(() => {
        getEmail()
    }, [])
    const getEmail = () => {
        setEmail(localStorage.getItem('email'));
    }

    const updateUsername = e => {
        setEmail(e.target.value);
    }
    const updatePassword = e => {
        setPassword(e.target.value)
    }
    const getLogin = e => {
        e.preventDefault();
        if (localStorage.getItem('email') === email
        && localStorage.getItem('password') === password){
         confirmLogin()
         setVisible('none');
         setEmail('');
        setPassword('');
        afterLogin();
        }else{
            setVisible('')
        }
    }



    return (
        <Form onSubmit={getLogin}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control onChange={updateUsername} required
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
                    <h5 style={{marginLeft:'20px', display:visible, color:'#da1c1c'}}>
                    Wrong email or password
                    </h5>
            </Row>
        </Form>
    )
}


export default Login;