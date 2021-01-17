import React from 'react';
import './waver.css';
import Logo from './Logo.png'

const Waver = ({owner}) => {

    


    return (
        <div className='waver'>
            <div style={{display:'flex'}}>
                <img alt='person' src={owner.picture} width='auto' height='100px'/>
                <p>{owner.title} {owner.lastName}</p>
            </div>
        </div>
    )
}

export default Waver;