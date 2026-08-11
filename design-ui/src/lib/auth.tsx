import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export interface User {
  name: string
  email: string
  studentId: string
  role: "student" | "admin"
}

interface AuthState {
  user: User | null
  isAuthed: boolean
  authModalOpen: boolean
  openAuthModal: () => void
  closeAuthModal: () => void
  login: () => void
  logout: () => void
}

const demoUser: User = {
  name: "Linh Tran",
  email: "linh.tran@university.edu",
  studentId: "SE180234",
  role: "admin",
}

const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [authModalOpen, setAuthModalOpen] = useState(false)

  const openAuthModal = useCallback(() => setAuthModalOpen(true), [])
  const closeAuthModal = useCallback(() => setAuthModalOpen(false), [])

  const login = useCallback(() => {
    setUser(demoUser)
    setAuthModalOpen(false)
  }, [])

  const logout = useCallback(() => setUser(null), [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthed: !!user,
        authModalOpen,
        openAuthModal,
        closeAuthModal,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
