import * as React from 'react'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'

import { simpleAPI } from './../../../lib/api'

export interface AuthContextType {
  user: string
  log: (user: string, callback: VoidFunction) => void
  logout: (callback: VoidFunction) => void
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
  const [user, setUser] = React.useState<any>(null)

  const log = (newUser: string, callback: VoidFunction) => {
    return simpleAPI.log(() => {
      setUser(newUser)
      callback()
    })
  }

  const logout = (callback: VoidFunction) => {
    return simpleAPI.logout(() => {
      setUser(null)
      callback()
    })
  }

  const value = { user, log, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
