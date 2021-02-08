import React, { useContext, useEffect, useState } from 'react';
import { auth } from './firebase';


 const AuthContext = React.createContext()

 export const useAuth = () => {
     return useContext(AuthContext)
 }


export const FirebaseFunctionsAuth = ({ children }) => {
    const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  

  

    const register = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password); 
    }

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password);
    }
    
    const forgotPassword = (email) => {
     return auth.sendPasswordResetEmail(email)
    }
    

    const addDisplayName = (userName) => {
        return auth.currentUser.updateProfile({displayName:userName})
    }
    const SignOut = () => {
        return (
            auth.signOut(),
            setLoading(true)
        )
    }

    useEffect( async () => {
        const unsubscribe = await auth.onAuthStateChanged(user => {
          setCurrentUser(user)
          setLoading(false)
        })
        return unsubscribe
    },[])
    const functions = {
        currentUser,
        register,
        login,
        forgotPassword,
        addDisplayName,
        SignOut
    }
    return(
        <AuthContext.Provider value={functions}>
            {!loading && children}
        </AuthContext.Provider>
    )

}

export default FirebaseFunctionsAuth;