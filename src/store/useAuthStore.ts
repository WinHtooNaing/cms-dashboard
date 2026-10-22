import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface User {
  email: string
  name?: string
}

interface AuthState {
  token: string | null
  user: User | null
  isAuthenticated: boolean
  setAuth: (token: string, user?: User | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      setAuth: (token: string, user: User | null = null) => {
        localStorage.setItem("token", token)
        set({ token, user, isAuthenticated: true })
      },

      logout: () => {
        localStorage.removeItem("token")
        set({ token: null, user: null, isAuthenticated: false })
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
