import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useData } from '../FirebaseComponents/firebaseFunctionsFiles';

const PrivateRoutingUserData = ({ children, ...rest }) => {
    const { userData } = useData();


 return (
     <Route {...rest} render={() => {
         return !userData ?
         children
         :
         <Redirect to='/'/>
     }
    } 
    />
 )
}

export default PrivateRoutingUserData;