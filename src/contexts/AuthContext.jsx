import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

const ROLES = {
  ADMIN: 'Admin',
  AGENCY: 'Agentur',
  CLIENT: 'Kunde',
}

const DEMO_USERS = [
  { id: 'u1', email: 'admin@hubpro.de', name: 'Max Müller', role: ROLES.ADMIN, avatar: 'MM' },
  { id: 'u2', email: 'agentur@hubpro.de', name: 'Sarah Schmidt', role: ROLES.AGENCY, avatar: 'SS' },
  { id: 'u3', email: 'kunde@hubpro.de', name: 'Thomas Weber', role: ROLES.CLIENT, avatar: 'TW' },
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const login = useCallback(async (email, password) => {
    setLoading(true)
    // Simulate API call
    await new Promise(r => setTimeout(r, 800))
    const found = DEMO_USERS.find(u => u.email === email)
    if (found) {
      setUser(found)
      setLoading(false)
      return { success: true }
    }
    setLoading(false)
    return { success: false, error: 'Ungültige Anmeldedaten' }
  }, [])

  const loginAsRole = useCallback((role) => {
    const found = DEMO_USERS.find(u => u.role === role)
    if (found) setUser(found)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  const isAdmin = user?.role === ROLES.ADMIN
  const isAgency = user?.role === ROLES.AGENCY || user?.role === ROLES.ADMIN
  const isClient = user?.role === ROLES.CLIENT

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      loginAsRole,
      logout,
      isAdmin,
      isAgency,
      isClient,
      ROLES,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export { ROLES }
