import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../FirebaseComponents/firebaseFunctionsAuth';
import { useData } from '../FirebaseComponents/firebaseFunctionsFiles';

const PrivateRoutingIn = ({ children, ...rest }) => {
    const { currentUser } = useAuth();
    const { userData } = useData()


 return (
     <Route {...rest} render={() => {
         return userData ?
         children
         :
         <Redirect to='/name-photo'/>
     }
    } 
    />
 )
}

export default PrivateRoutingIn;