import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let supabaseClient = null

if (supabaseUrl && supabaseAnonKey) {
  try {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err)
  }
}

if (!supabaseClient) {
  console.warn('Supabase environment variables are missing. Using a mock client to prevent crash.')
  // Mock client prevents runtime errors in components (like Contact.jsx) by returning a stubbed response
  supabaseClient = {
    from: () => ({
      insert: async () => ({ error: new Error('Supabase configuration is missing.') })
    })
  }
}

export const supabase = supabaseClient
