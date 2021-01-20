import React from 'react';
import './header.css';
import Logo from './Logo.png';
import {Col, Image} from 'react-bootstrap';
import {
    Link
  } from "react-router-dom";

const Header = ({isLogin, signOut, location}) => {

    let conditionalLoginComp;
    let conditionalLogo;

    if(location !== '/login' && location !== '/register'){
        conditionalLogo =  <Link
         style={{textDecoration:'none', height:'min-content', width:'min-content'}}to='/'>
         <Image src={Logo} width='180' height='180' rounded />
            </Link>
    }else{
        conditionalLogo = <Image src={Logo} width='180' height='180' rounded />;
    }

    if(location !== '/login'){

        
    
     conditionalLoginComp = <Link style={{textDecoration:'none', height:'min-content', width:'min-content'}}
                                to='/login'>
                                { !isLogin ?
                                <h2 className='log'>Login</h2>
                                : <h2 onClick={() => signOut} className='signOut'>Sign Out</h2>
                                }
                            </Link>
    }else{
        <Link style={{textDecoration:'none', height:'min-content', width:'min-content'}}
                                to='/login'>
                                { !isLogin ?
                                <h2 className='log'>kaka</h2>
                                : <h2 onClick={() => signOut} className='signOut'>Sign Out</h2>
                                }
                            </Link>
    }
    
   let conditionalReg;
   if(location !== '/register'){
       conditionalReg = <Link style={{textDecoration:'none', height:'min-content', width:'min-content'}}
                            to='/register'>
                            <h2 className='reg'>Register</h2>
                        </Link>

        conditionalLoginComp = <Link style={{textDecoration:'none', height:'min-content', width:'min-content'}}
                                    to='/login'>
                                    { !isLogin ?
                                    <h2 className='log'>Login</h2>
                                    : <h2 onClick={() => signOut} className='signOut'>Sign Out</h2>
                                    }
                                </Link>;
   }

    return (
        <Col className='header'>
            {conditionalLogo}
                <div className='regLog'>
                {conditionalReg}
                {conditionalLoginComp}
                </div>
        </Col>
    )
}

export default Header;