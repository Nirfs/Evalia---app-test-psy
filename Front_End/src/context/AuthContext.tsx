import { createContext } from 'react'
import type { AuthContextType } from '../type/type'

export const AuthContext = createContext<AuthContextType | null>(null)
