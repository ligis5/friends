import React from "react";
import "./header.css";
import Logo from "./Logo.png";
import basicUser from "./basicUser.png";
import { Col, Image, Dropdown, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../FirebaseComponents/firebaseFunctionsAuth";
import { useData } from "../FirebaseComponents/firebaseFunctionsFiles";

const Header = () => {
  const { currentUser } = useAuth();
  const { userData, userPhoto } = useData();
  const { SignOut } = useAuth();

  let loggedIn = "yes";
  if (!userData) {
    loggedIn = "no";
  }

  const LoginPath = () => {
    return (
      <Link
        style={{
          textDecoration: "none",
          height: "min-content",
          width: "min-content",
        }}
        to="/login"
      >
        <h2 className={loggedIn}>Login</h2>
      </Link>
    );
  };

  return (
    <Col className="header">
      <Link to="/">
        <Image
          style={{ marginTop: "10px" }}
          src={Logo}
          width="80"
          height="80"
        />
      </Link>
      <div className="regLog">
        {currentUser ? (
          <Row
            style={{ display: "flex", flexWrap: "nowrap", marginRight: "10px" }}
          >
            <Image
              src={userPhoto ? userPhoto : basicUser}
              roundedCircle
              style={{
                marginTop: "5px",
                width: "60px",
                height: "60px",
                objectFit: "cover",
                border: "1px solid aliceblue",
                backgroundColor: "rgb(79,59,120)",
                boxShadow: "2px 2px aliceblue",
              }}
            />
            <Dropdown style={{ marginTop: "15px" }}>
              <Dropdown.Toggle
                style={{
                  minWidth: "150px",
                  maxWidth: "250px",
                  overflow: "hidden",
                  backgroundColor: "rgb(56, 41, 84)",
                  border: "1px solid aliceblue",
                  boxShadow: "1px 1px aliceblue",
                  fontSize: "120%",
                }}
                variant="success"
                id="dropdown-basic"
              >
                {userData ? userData.UserName : currentUser.email}
              </Dropdown.Toggle>
              <Dropdown.Menu
                style={{
                  backgroundColor: "rgb(79,59,120)",
                  border: "1px solid aliceblue",
                  marginRight: "5px",
                }}
              >
                <Dropdown.Item as="div" href="#/action-1" bsPrefix="item1">
                  <Link
                    style={{
                      textDecoration: "none",
                      height: "min-content",
                      width: "max-content",
                    }}
                    to="/profile"
                  >
                    <p className="yes">Profile</p>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item as="div" href="#/action-1" bsPrefix="item1">
                  <Link
                    style={{
                      textDecoration: "none",
                      height: "min-content",
                      width: "max-content",
                    }}
                    to="/"
                  >
                    <p className="yes">Home</p>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item as="div" href="#/action-2" bsPrefix="item2">
                  <Link
                    onClick={SignOut}
                    style={{
                      textDecoration: "none",
                      height: "min-content",
                      width: "min-content",
                    }}
                    to="/login"
                  >
                    <p className="signOut">Sign-out</p>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Row>
        ) : (
          <div className="regLog">
            <Link
              style={{
                textDecoration: "none",
                height: "min-content",
                width: "max-content",
              }}
              to="/register"
            >
              <h2 className="no">Register</h2>
            </Link>
            <LoginPath />
          </div>
        )}
      </div>
    </Col>
  );
};

export default Header;
