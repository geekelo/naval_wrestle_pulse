import { createContext, useContext, useMemo, useState } from 'react'
import {
  clearSession,
  getStoredToken,
  getStoredUser,
  login as loginRequest,
  saveSession,
} from '../api/auth.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getStoredToken())
  const [user, setUser] = useState(() => getStoredUser())

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      async login(email, password) {
        const data = await loginRequest(email, password)
        const nextToken = data.token
        const nextUser = data.user ?? { email }
        saveSession({ token: nextToken, user: nextUser })
        setToken(nextToken)
        setUser(nextUser)
        return data
      },
      logout() {
        clearSession()
        setToken(null)
        setUser(null)
      },
    }),
    [token, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
