import { User } from '@supabase/supabase-js'
import { useState } from 'react'

// Mock user for development
const mockUser: User = {
  id: 'mock-user-id',
  app_metadata: {},
  user_metadata: {},
  aud: 'authenticated',
  created_at: new Date().toISOString(),
  role: 'authenticated',
  email: 'mock@example.com',
}

export function useAuth() {
  const [user] = useState<User | null>(mockUser)
  const [loading] = useState(false)

  return {
    user,
    loading,
    signIn: async () => {
      console.log('Mock sign in')
    },
    signUp: async () => {
      console.log('Mock sign up')
    },
    signOut: async () => {
      console.log('Mock sign out')
    },
  }
}