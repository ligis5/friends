import React,{useRef, useEffect, useState} from "react";
import "./App.css";
import Header from "./components/Header/header";
import { Container, Row, Col } from "react-bootstrap";
import { Switch } from "react-router-dom";
import Login from "./components/UserAuth/Login";
import Register from "./components/UserAuth/Register";
import ForgotPassword from "./components/UserAuth/ForgotPassword";
import NameAndPhoto from "./components/UserAuth/NameAndPhoto";
import PrivateRoutingIn from "./components/Routing/PrivateRoutingIn";
import PrivateRoutingOut from "./components/Routing/PrivateRoutingOut";
import PrivateRoutingReg from "./components/Routing/PrivateRoutingReg";
import PrivateRoutingUserData from "./components/Routing/PrivateRoutingUserData";
import ProfilePage from "./components/Content/Profile/ProfilePage";
import Posts from "./components/Content/Posts/Posts";
import CreatePost from "./components/Content/CreatePost/CreatePost";
import PostProfilePage from "./components/Content/PostProfile/PostProfilePage";
import FriendsDropLeft from "./components/Content/Friends/Mobile/FriendsDropLeft";
import DesktopFriends from "./components/Content/Friends/Desktop/DesktopFriends";


const App = () => {
  const containerRef = useRef();
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    if(containerRef){
      window.addEventListener('resize', () => {
        setWidth(containerRef.current.clientWidth)
      })
      
      
    }
  }, [containerRef])
  
  return (
    <Container fluid='xxl' className="App" ref={containerRef} style={{width:'100%'}}>
      <Row style={{width:'100%'}}>
        <Col>
          <Header parentWidth={width}/>
        </Col>
      </Row>
      <Switch>
        <PrivateRoutingIn exact path="/">
          <Row style={{width:'100%'}}>
          <Col xl='6' lg="12"
              className="posts"
              style={{ display: "flex",
               justifyContent:'flex-start',
                width:'100%',paddingRight:'0'
                  }}
            >
            <CreatePost parentWidth={width}/>
            </Col>
            <Col xl='6' lg="12"
              className="posts"
              style={{ display: "flex",
               justifyContent:width < 1750 ?'flex-start': "center",
                width:'100%', paddingRight:'0'
                  }}
            >
              <Posts parentWidth={width}/>
            </Col>
          </Row>
          <Row>
            {width < 800 ? <FriendsDropLeft /> :<DesktopFriends />}
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
        <PrivateRoutingUserData exact path="/name-photo">
          <NameAndPhoto />
        </PrivateRoutingUserData>
        <PrivateRoutingIn exact path="/profile/:user">
          <PostProfilePage parentWidth={width}/>
        </PrivateRoutingIn>
        <PrivateRoutingIn exact path="/profile">
          <ProfilePage />
        </PrivateRoutingIn>
      </Switch>
    </Container>
  );
};

export default App;
