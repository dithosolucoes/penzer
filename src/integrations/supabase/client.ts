import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = 'https://mock.supabase.co'
const supabaseKey = 'mock-key'

// Mock Supabase client that implements the required interface
export const supabase = {
  supabaseUrl,
  supabaseKey,
  realtime: {},
  realtimeUrl: '',
  authUrl: '',
  storageUrl: '',
  functionsUrl: '',
  rest: {},
  
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({
      data: { subscription: { unsubscribe: () => {} } }
    }),
    signInWithPassword: (credentials: { email: string, password: string }) => 
      Promise.resolve({ data: null, error: null }),
    signUp: (credentials: { email: string, password: string }) => 
      Promise.resolve({ data: null, error: null }),
    signOut: () => Promise.resolve({ error: null }),
    updateUser: (attributes: { password?: string }) =>
      Promise.resolve({ data: null, error: null })
  },

  storage: {
    from: (bucket: string) => ({
      upload: (path: string, file: File) => 
        Promise.resolve({ data: null, error: null }),
      getPublicUrl: (path: string) => 
        ({ data: { publicUrl: 'https://placehold.co/400' } })
    })
  },

  from: (table: string) => ({
    select: (query?: string) => ({
      eq: (column: string, value: any) => ({
        single: () => Promise.resolve({ data: { id: 'mock-id' }, error: null }),
        order: (column: string, options: { ascending: boolean }) => ({
          data: [], 
          error: null
        }),
        data: [],
        error: null
      }),
      gte: (column: string, value: any) => ({
        data: [],
        error: null
      }),
      order: (column: string, options: { ascending: boolean }) => ({
        data: [],
        error: null
      }),
      data: [],
      error: null
    }),
    insert: (data: any) => ({
      select: () => ({
        single: () => Promise.resolve({ data: { id: 'mock-id' }, error: null })
      }),
      error: null
    }),
    update: (data: any) => ({
      eq: (column: string, value: any) => 
        Promise.resolve({ error: null }),
      error: null
    }),
    delete: () => ({
      eq: (column: string, value: any) =>
        Promise.resolve({ error: null })
    })
  })
} as unknown as ReturnType<typeof createClient<Database>>