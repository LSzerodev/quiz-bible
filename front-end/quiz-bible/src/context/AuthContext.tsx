/* eslint-disable react-refresh/only-export-components */

import { getAuth, onAuthStateChanged } from "firebase/auth"
import type { User } from "firebase/auth"
import { createContext, useEffect, useState } from "react"
import type { ReactNode } from "react"

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthContextType {
    user: User | null
    loading: boolean
}

interface AuthProviderProps {
    children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        const auth = getAuth()
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser || null)
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])
    
    const value = { user, loading }
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}