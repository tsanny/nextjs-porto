import React, { useContext, useState, useEffect, useRef } from 'react'
import { auth } from '../firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth'

interface AuthContextValue {
    currentUser: User | null
    login: (email: string, password: string) => void
    signup: (email: string, password: string) => void
    logout: () => void
    userInfo: any
}

const AuthContext = React.createContext<AuthContextValue>({
    currentUser: null,
    login() {},
    signup() {},
    logout() {},
    userInfo: {},
})

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}: {children:any}) {

    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const userInfo = useRef()

    function signup(email:string, password:string) {
        createUserWithEmailAndPassword(auth, email, password)
        return
    }

    function login(email:string, password:string) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        userInfo
    }

    return (
        <AuthContext.Provider value = {value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}