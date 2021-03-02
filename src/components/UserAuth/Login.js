import React, { useState, useRef } from "react";
import { Form, Button, Row, Container } from "react-bootstrap";
import "./Login.css";
import { googleAuth } from "../FirebaseComponents/firebase";
import { useAuth } from "../FirebaseComponents/firebaseFunctionsAuth";
import { Link } from "react-router-dom";
import { useData } from "../FirebaseComponents/firebaseFunctionsFiles";

const Login = () => {
  const { login } = useAuth();
  const email = useRef();
  const password = useRef();
  const [visible, setVisible] = useState("none");

  const loginWithEmail = async () => {
    try {
      await login(email.current.value, password.current.value);
    } catch (error) {
      setVisible("");
      console.log(error);
    }
  };

  const getLogin = (e) => {
    e.preventDefault();
    setVisible("none");
    loginWithEmail();
    e.target.reset();
  };

  return (
    <Container>
      <h1 style={{ color: "aliceblue", textAlign: "center" }}>Login</h1>
      <Form onSubmit={getLogin}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label style={{ display: "grid" }}>
            Email address
            <p style={{ display: visible, color: "#da1c1c" }}>
              Wrong email or password
            </p>
          </Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter email"
            ref={email}
          />
        </Form.Group>
        <br />

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            ref={password}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Row style={{ gap: "30px", marginLeft: "10px" }}>
          <Button bsPrefix="formButton" variant="primary" type="submit">
            Submit
          </Button>
          <Button
            bsPrefix="formButton"
            className="google"
            variant="primary"
            onClick={googleAuth}
          >
            Google
          </Button>
          <Link to="forgot-password">Forgot password?</Link>
        </Row>
      </Form>
    </Container>
  );
};

export default Login;
