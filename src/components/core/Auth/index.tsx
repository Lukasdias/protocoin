import * as React from 'react'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'

import { simpleAPI } from './../../../lib/api'

const USER_AUTH_KEY = 'AUTH_USER'

export interface AuthContextType {
  user: string
  log: (user: string, callback: VoidFunction) => void
  logOut: (callback: VoidFunction) => void
}

const AuthContext = React.createContext<AuthContextType>(null!)

export function useAuth() {
  return React.useContext(AuthContext)
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth()
  const location = useLocation()
  if (!auth.user) return <Navigate to="/" state={{ from: location }} replace />
  return children
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<any>(
    localStorage.getItem(USER_AUTH_KEY)
  )

  const log = (newUser: string, callback: VoidFunction) => {
    return simpleAPI.log(() => {
      localStorage.setItem(USER_AUTH_KEY, newUser)
      setUser(newUser)
      callback()
    })
  }

  const logOut = (callback: VoidFunction) => {
    return simpleAPI.logOut(() => {
      localStorage.setItem(USER_AUTH_KEY, 'none')
      setUser(null)
      callback()
    })
  }

  const value = { user, log, logOut }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
