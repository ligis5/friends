import React from "react";
import "./header.css";
import Logo from "./Logo.png";
import basicUser from "./basicUser.png";
import { Col, Image, Dropdown, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../FirebaseComponents/firebaseFunctionsAuth";
import { useData } from "../FirebaseComponents/firebaseFunctionsFiles";
import { FireDatabase } from "../FirebaseComponents/FirebaseDatabase";
import SearchBar from "../Content/SearchBar/SearchBar";

const Header = () => {
  const { currentUser } = useAuth();
  const { userData, userPhoto } = useData();
  const { SignOut } = useAuth();
  const { logOff } = FireDatabase();

  let loggedIn = "yes";
  if (!userData) {
    loggedIn = "no";
  }

  const seeYaLater = () => {
    logOff();
    SignOut();
  };

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
    <Col className="header" style={{padding:'0', width:'100%'}}>
      <Link to="/">
        <Image
          style={{ marginTop: "10px", width:'calc(2vw + 4vh)', height:'calc(2vw + 4vh)' }}
          src={Logo}
        />
      </Link>
      {userData ? <SearchBar /> : <></>}

      <div className="regLog">
        {currentUser ? (
          <Row
            style={{ display: "flex", flexWrap: "nowrap" }}
          >
            <Image
              src={userPhoto ? userPhoto : basicUser}
              roundedCircle
              style={{

                marginTop: "auto",
                 width:'calc(2vw + 4vh)',
                 height:'calc(2vw + 4vh)',
                objectFit: "cover",
                border: "1px solid aliceblue",
                backgroundColor: "rgb(79,59,120)",
                boxShadow: "2px 2px aliceblue",
                zIndex:'100'
              }}
            />
            <Dropdown style={{ marginTop: "auto", zIndex: "999" }}>
              <Dropdown.Toggle
                style={{
                  width:'calc(3vw + 9vh)',
                  height:'calc(2vw + 3vh)',
                  maxHeight:'40px',
                  overflow: "hidden",
                  backgroundColor: "rgb(56, 41, 84)",
                  border: "1px solid aliceblue",
                  boxShadow: "1px 1px aliceblue",
                  fontSize: "120%",
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center'

                }}
                variant="success"
                id="dropdown-basic"
              >
                {userData ? userData.UserName : currentUser.email}
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropDownMenu">
                <Dropdown.Item
                  style={{ textDecoration: "none" }}
                  as={Link}
                  to="/profile"
                  href="#/action-1"
                  bsPrefix="item1"
                >
                  <h3 className="yes">Profile</h3>
                </Dropdown.Item>
                <Dropdown.Item
                  style={{ textDecoration: "none" }}
                  as={Link}
                  to="/"
                  href="#/action-1"
                  bsPrefix="item1"
                >
                  <h3 className="yes">Home</h3>
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={seeYaLater}
                  style={{ textDecoration: "none"}}
                  as={Link}
                  to="/login"
                  href="#/action-2"
                  bsPrefix="item1"
                >
                  <h3 className="signOut">Sign-out</h3>
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
