// Mock Supabase client
export const supabase = {
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({
      data: { subscription: { unsubscribe: () => {} } }
    }),
    signInWithPassword: () => Promise.resolve({ error: null }),
    signUp: () => Promise.resolve({ error: null }),
    signOut: () => Promise.resolve({ error: null })
  },
  storage: {
    from: () => ({
      upload: () => Promise.resolve({ error: null }),
      getPublicUrl: () => ({ data: { publicUrl: 'https://placehold.co/400' } })
    })
  },
  from: (table: string) => ({
    insert: () => ({
      select: () => ({
        single: () => Promise.resolve({ data: { id: 'mock-id' }, error: null })
      })
    }),
    select: () => Promise.resolve({ data: [], error: null }),
    update: () => Promise.resolve({ error: null }),
    delete: () => Promise.resolve({ error: null })
  })
}