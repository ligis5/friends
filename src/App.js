import React from "react";
import "./App.css";
import Header from "./components/header";
import { Container, Row, Col } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import Login from "./components/UserAuth/Login";
import Register from "./components/UserAuth/Register";
import ForgotPassword from "./components/UserAuth/ForgotPassword";
import NameAndPhoto from "./components/UserAuth/NameAndPhoto";
import PrivateRoutingIn from "./components/Routing/PrivateRoutingIn";
import PrivateRoutingOut from "./components/Routing/PrivateRoutingOut";
import PrivateRoutingReg from "./components/Routing/PrivateRoutingReg";
import ProfilePage from './components/Content/ProfilePage';


const App = () => {


  return (
    <Container fluid className="App">
      <Row>
        <Col style={{ padding: "0" }}>
          <Header />
        </Col>
      </Row>
      <Switch>
        <PrivateRoutingIn exact path="/">
          <Row>
            <Col style={{ padding: "0" }}>
              <Container style={{ padding: "0" }}>
                <button
                  onClick={() => window.scrollTo(0, 0)}
                  style={{
                    position: "fixed",
                    bottom: "0vw",
                    right: "0vw",
                    color: "whitesmoke",
                    backgroundColor: "rgb(79,59,120)",
                  }}
                >
                  Go Top
                </button>
              </Container>
            </Col>
          </Row>
        </PrivateRoutingIn>
        <PrivateRoutingOut exact path="/login">
          <Login />
        </PrivateRoutingOut>
        <PrivateRoutingReg exact path="/register">
          <Register />
        </PrivateRoutingReg>
        <PrivateRoutingOut exact path="/forgot-password">
          <ForgotPassword />
        </PrivateRoutingOut>
        <PrivateRoutingIn exact path="/name-photo">
          <NameAndPhoto />
        </PrivateRoutingIn>
        <PrivateRoutingIn exact path="/profile">
          <ProfilePage />
        </PrivateRoutingIn>
      </Switch>
    </Container>
  );
};

export default App;
