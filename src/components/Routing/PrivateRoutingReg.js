import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../FirebaseComponents/firebaseFunctionsAuth';

const PrivateRoutingReg = ({ children, ...rest }) => {
    const { currentUser } = useAuth();


 return (
     <Route {...rest} render={() => {
         return !currentUser ?
         children
         :
         <Redirect to='/name-photo'/>
     }
    } 
    />
 )
}

export default PrivateRoutingReg;