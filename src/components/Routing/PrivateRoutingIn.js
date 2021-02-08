import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../FirebaseComponents/firebaseFunctionsAuth';

const PrivateRoutingIn = ({ children, ...rest }) => {
    const { currentUser } = useAuth();


 return (
     <Route {...rest} render={() => {
         return currentUser ?
         children
         :
         <Redirect to='/login'/>
     }
    } 
    />
 )
}

export default PrivateRoutingIn;