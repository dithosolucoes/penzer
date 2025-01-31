import { User } from '@supabase/supabase-js'
import { useState } from 'react'

// Mock user for development
const mockUser: User = {
  id: 'mock-user-id',
  app_metadata: {},
  user_metadata: {
    avatar_url: 'https://github.com/shadcn.png',
    full_name: 'John Doe',
    profile_type: 'concurseiro'
  },
  aud: 'authenticated',
  created_at: new Date().toISOString(),
  role: 'authenticated',
  email: 'mock@example.com',
}

export function useAuth() {
  const [user] = useState<User | null>(mockUser)

  return {
    user,
    loading: false,
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