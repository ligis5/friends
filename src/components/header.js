import React from 'react'
import './header.css'
import Logo from './Logo.png'


const Header = () => {


    return (
        <div className='header'>
            <img alt='logo' src={Logo} width='min-content' height='200px' />
                <div className='tag-group'>
                     <h2 className='login'>Login</h2>
                </div>
        </div>
    )
}

export default Header;