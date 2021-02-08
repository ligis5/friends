import React from "react";
import "./App.css";
import Header from "./components/header";
import { Container, Row, Col } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import Login from "./components/UserAuth/Login";
import Register from "./components/UserAuth/Register";
import ForgotPassword from "./components/UserAuth/ForgotPassword";
import NameAndPhoto from './components/UserAuth/NameAndPhoto';
import { useAuth } from './components/FirebaseComponents/firebaseFunctionsAuth';
import PrivateRouting from './components/Routing/PrivateRouting';


const App = () => {
  const { currentUser } = useAuth();
  

  return (
    
      <Container fluid className="App">
        <Row>
          <Col style={{padding:'0'}}>
            <Header />
          </Col>
        </Row>
        <Switch>
          <PrivateRouting exact path="/">
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
                        backgroundColor: "rgb(79,59,120)",}}
                    >
                      Go Top
                    </button>
                  </Container>
              </Col>
            </Row>
          </PrivateRouting>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/forgot-password">
            <ForgotPassword />
          </Route>
          <PrivateRouting exact path="/name-photo">
            <NameAndPhoto />
          </PrivateRouting>
        </Switch>
      </Container>
      
  );
}

export default App;
