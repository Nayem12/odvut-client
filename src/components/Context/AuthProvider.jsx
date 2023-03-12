import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"


export const AuthContext = createContext()
const auth = getAuth(app)

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState("")
    const [loading, setLoading] = useState(true)

    // Create New User
    const handleCreateUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // Create User With Google
    const handleGoogle = (provider) => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    // SignIn User
    const handlelogin = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    // User LogOut
    const userLogOut = () => {
        return signOut(auth)
    }

    // State Change
    useEffect(() => {
        const unsubscriber = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => {
            unsubscriber()
        }
    }, [])
    // 
    const authValue = { user, loading, setLoading, handleCreateUser, handleGoogle, handlelogin, userLogOut }

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;