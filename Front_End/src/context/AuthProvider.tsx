import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { AuthContext } from './authContext'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const isLoggedIn = !!token

  useEffect(() => {
    const savedToken = localStorage.getItem('authToken')
    if (savedToken) setToken(savedToken)
  }, [])

  const login = (newToken: string) => {
    setToken(newToken)
    localStorage.setItem('authToken', newToken)
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem('authToken')
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
