import React, {useState} from 'react';
import './header.css';
import Logo from './Logo.png';
import {Col, Image} from 'react-bootstrap';
import {
    Link
  } from "react-router-dom";
  

const Header = ({location, isLogin, googleSignOut}) => {
    
    
                        
    let conditionalLogin;
    let conditionalLogo = <Link
                                style={{textDecoration:'none', height:'min-content', width:'min-content'}}to='/'>
                                <Image src={Logo} width='180' height='180' rounded />
                            </Link>;
    let conditionalReg;

   
    if(location === '/login'){
        conditionalLogo = <Image src={Logo} width='180' height='180' rounded />
        conditionalLogin= ''
        conditionalReg = <h2 className='reg'>Register</h2>
    }
    if(location === '/register'){
        conditionalLogo = <Image src={Logo} width='180' height='180' rounded />
        conditionalLogin = <h2 className='log'>Login</h2>
        conditionalReg = ''
    }else if(location === '/register' && isLogin === true){
        conditionalLogin = <h2 onClick={googleSignOut} className='signOut'>Sign Out</h2>
    }
    if(location === '/'){
        conditionalLogin = <h2 style={{width:'7vw'}} onClick={googleSignOut} className='signOut'>Sign Out</h2>
        conditionalReg = ''
    }
    

    return (
        <Col className='header'>
            {conditionalLogo}
                <div className='regLog'>
                    <Link style={{textDecoration:'none', height:'min-content', width:'min-content'}}
                        to='/register'>
                        {conditionalReg}
                    </Link>
                    <Link style={{textDecoration:'none', height:'min-content', width:'min-content'}}
                        to='/login'>
                         {conditionalLogin}
                    </Link>
                </div>
        </Col>
    )
}

export default Header;