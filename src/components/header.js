import React from "react";
import "./header.css";
import Logo from "./Logo.png";
import { Col, Image, Dropdown, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "./FirebaseComponents/firebaseFunctionsAuth";
import { useData } from './FirebaseComponents/firebaseFunctionsFiles';

const Header = () => {
  const { currentUser } = useAuth();
  const { userData, userPhoto } = useData();
  const { SignOut } = useAuth();

 

  let loggedIn = 'yes';
  if (!userData){
    loggedIn = 'no'
  }

const RegisterPath = () => {
  return (
    <Link
style={{
  textDecoration: "none",
  height: "min-content",
  width: "max-content",
}}
to="/register"
>
  { currentUser ?
  <p className='yes'>Register</p>
  :
  <h2 className='no'>Register</h2>
  }

</Link>
  )
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
  )
}



  
  return (
    <Col bsPrefix="header">
      <Image src={Logo} width="180" height="180"  rounded />
      <div className="regLog">
        { currentUser ?
        <Row style={{display:'flex', flexWrap:'nowrap'}} >
          { userData ?
            <Image src={userPhoto} roundedCircle
            style={{
                maxWidth:'80px',
                maxHeight:'80px', 
                border:'1px solid aliceblue',
                boxShadow:'2px 2px aliceblue'
                }}/>
                :
                <>
                </>
          }

        <Dropdown style={{margin:'10px', marginTop:'20px'}}>
          <Dropdown.Toggle style={{
            minWidth:'150px',
            backgroundColor:'rgb(56, 41, 84)',
            border:'1px solid aliceblue',
            boxShadow:'1px 1px aliceblue',
            fontSize:'120%'
          }}
            variant="success"
            id="dropdown-basic"
          > 
             { userData ?
             userData.name 
             :
             currentUser.email
             } 
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ backgroundColor: "rgb(79,59,120)",
          border:'1px solid aliceblue',
          marginRight:'5px'
        }}>
            <Dropdown.Item as='div' href="#/action-1" bsPrefix='item1'>
              <RegisterPath />
            </Dropdown.Item>
            <Dropdown.Item as='div' href="#/action-2" bsPrefix='item2'>
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
      : 
      <div className="regLog">
        <RegisterPath />
        <LoginPath />
      </div>
      }
      </div>
    </Col>
  );
};

export default Header;
