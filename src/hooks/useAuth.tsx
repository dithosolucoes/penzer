
import { User } from '@supabase/supabase-js'
import { useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useNavigate } from 'react-router-dom'
import { useToast } from './use-toast'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo de volta."
      })
      navigate('/')
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao fazer login",
        description: "Verifique suas credenciais e tente novamente."
      })
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, metadata: { profile_type: string }) => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      })
      if (error) throw error
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Verifique seu email para confirmar o cadastro."
      })
      navigate('/login')
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro no cadastro",
        description: "Verifique suas informações e tente novamente."
      })
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    try {
      await supabase.auth.signOut()
      setUser(null)
      toast({
        title: "Logout realizado com sucesso"
      })
      navigate('/login')
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao fazer logout",
        description: "Tente novamente."
      })
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  }
}
