import React, { useState, useRef } from "react";
import { Form, Button, Row, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuth } from "../FirebaseComponents/firebaseFunctionsAuth";

const Register = () => {
  const { register } = useAuth();
  const regEmail = useRef();
  const regPassword = useRef();
  const regConfirmPassword = useRef();
  const [pswDontMatch, setPswDontMatch] = useState("none");
  const [emailInUse, setEmailInUse] = useState("none");
  const [wrongPass, setWrongPass] = useState("none");

  const userRegister = async () => {
    if (regConfirmPassword.current.value.length >= 8) {
      if (regConfirmPassword.current.value !== regPassword.current.value) {
        setPswDontMatch("");
        setEmailInUse("none");
        setWrongPass("none");
      } else {
        try {
          await register(regEmail.current.value, regPassword.current.value);
        } catch (error) {
          console.log(error);
          if (error.code === "auth/email-already-in-use") {
            setEmailInUse("");
            setPswDontMatch("none");
            setWrongPass("none");
          }
        }
      }
    } else {
      setWrongPass("");
      setPswDontMatch("none");
      setEmailInUse("none");
    }
  };

  const getRegister = (e) => {
    e.preventDefault();
    userRegister();
    e.target.reset();
  };

  return (
    <Container>
      <h1 style={{ color: "aliceblue", textAlign: "center" }}>Register</h1>
      <Form onSubmit={getRegister}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label style={{ display: "flex" }}>
            Email address
            <p
              style={{
                marginLeft: "20px",
                marginBottom: "0",
                display: emailInUse,
                color: "#da1c1c",
              }}
            >
              Email already in use
            </p>
          </Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Email"
            ref={regEmail}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>
            Password
            <p
              style={{
                marginLeft: "20px",
                marginBottom: "0",
                display: wrongPass,
                color: "#da1c1c",
              }}
            >
              Password should contain at least 8 characters
            </p>
          </Form.Label>
          <Form.Control
            required
            ref={regPassword}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label style={{ display: "flex" }}>
            Confirm Password
            <p
              style={{
                marginLeft: "20px",
                marginBottom: "0",
                display: pswDontMatch,
                color: "#da1c1c",
              }}
            >
              Passwords dont match
            </p>
          </Form.Label>
          <Form.Control
            required
            ref={regConfirmPassword}
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Group>
        <Row style={{ gap: "30px", marginLeft: "10px" }}>
          <Button bsPrefix="formButton" variant="primary" type="submit">
            Register
          </Button>
        </Row>
      </Form>
    </Container>
  );
};

export default Register;
