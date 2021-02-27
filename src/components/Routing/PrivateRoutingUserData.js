import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../FirebaseComponents/firebaseFunctionsAuth';
import { useData } from '../FirebaseComponents/firebaseFunctionsFiles';

const PrivateRoutingUserData = ({ children, ...rest }) => {
    const { currentUser } = useAuth();
    const { userData } = useData();


 return (
     <Route {...rest} render={() => {
         return (
             currentUser ?
             (
                 !userData ?
                children
                :
                <Redirect to='/'/>
                )
                :
                <Redirect to='login'/>
         )
        }
    } 
    />
 )
}

export default PrivateRoutingUserData;